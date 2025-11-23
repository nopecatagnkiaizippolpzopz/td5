import request from "supertest";
import app from "../../src/app.js";

describe("Appointments API", () => {
    it("GET /api/appointments should return an array", async () => {
        const res = await request(app).get("/api/appointments");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/appointments should add a new appointment", async () => {
        const res = await request(app)
            .post("/api/appointments")
            .send({ doctorId: 1, patientId: 1, date: "2025-04-10", time: "09:00" });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.doctorId).toBe(1);
        expect(res.body.patientId).toBe(1);
    });

    it("POST /api/appointments should fail without required fields", async () => {
        const res = await request(app)
            .post("/api/appointments")
            .send({ doctorId: 1, patientId: 1 });
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});
