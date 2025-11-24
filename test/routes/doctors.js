import request from "supertest";
import app, { initializeApp } from "../../src/app.js";
import { closeDB, getDB } from "../../src/db.js";

describe("Doctors API", () => {
    let createdDoctorId;

    beforeAll(async () => {
        await initializeApp();
    });

    afterAll(async () => {
        // Clean up test data
        if (createdDoctorId) {
            const db = getDB();
            await db.collection("doctors").deleteMany({ name: "Dr. Riahi" });
        }
        await closeDB();
    });

    it("GET /api/doctors should return an array", async () => {
        const res = await request(app).get("/api/doctors");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/doctors should add a new doctor", async () => {
        const res = await request(app)
            .post("/api/doctors")
            .send({ name: "Dr. Riahi", specialty: "Neurology" });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.name).toBe("Dr. Riahi");
        expect(res.body.specialty).toBe("Neurology");
        
        createdDoctorId = res.body._id;
    });
});
