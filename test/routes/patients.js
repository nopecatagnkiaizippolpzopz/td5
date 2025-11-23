import request from "supertest";
import app from "../../src/app.js";

describe("Patients API", () => {
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
        expect(res.body).toHaveProperty("id");
        expect(res.body.name).toBe("Jane Doe");
        expect(res.body.age).toBe(28);
    });

    it("POST /api/patients should fail without required fields", async () => {
        const res = await request(app)
            .post("/api/patients")
            .send({ name: "Jane Doe" });
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});
