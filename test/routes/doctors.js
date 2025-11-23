import request from "supertest";
import app from "../../src/app.js";

describe("Doctors API", () => {
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
        expect(res.body).toHaveProperty("id");
        expect(res.body.name).toBe("Dr. Riahi");
    });
});
