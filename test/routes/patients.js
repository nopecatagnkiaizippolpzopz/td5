import request from "supertest";
import app, { initializeApp } from "../../src/app.js";
import { closeDB, getDB } from "../../src/db.js";

describe("Patients API", () => {
    let createdPatientId;

    beforeAll(async () => {
        await initializeApp();
    });

    afterAll(async () => {
        // Clean up test data
        if (createdPatientId) {
            const db = getDB();
            await db.collection("patients").deleteMany({ name: "Jane Doe" });
        }
        await closeDB();
    });

    it("GET /api/patients should return an array", async () => {
        const res = await request(app).get("/api/patients");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/patients should add a new patient", async () => {
        const res = await request(app)
            .post("/api/patients")
            .send({ name: "Jane Doe", age: 28 });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.name).toBe("Jane Doe");
        expect(res.body.age).toBe(28);
        
        createdPatientId = res.body._id;
    });

    it("POST /api/patients should fail without required fields", async () => {
        const res = await request(app)
            .post("/api/patients")
            .send({ name: "Jane Doe" });
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});
