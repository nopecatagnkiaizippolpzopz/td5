import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import app from "../../src/app.js";
import Patient from "../../src/models/patient.model.js";

describe("Patients API (integration)", () => {
    beforeEach(async () => {
        await Patient.deleteMany({});
    });

    describe("POST /api/patients", () => {
        it("creates a patient and returns 201", async () => {
            const createRes = await request(app)
                .post("/api/patients")
                .send({ name: "Alice Test", age: 30 });

            expect(createRes.status).toBe(201);
            expect(createRes.body).toHaveProperty("_id");
            expect(createRes.body.name).toBe("Alice Test");
            expect(createRes.body.age).toBe(30);
        });

        it("returns 400 if name is missing", async () => {
            const createRes = await request(app)
                .post("/api/patients")
                .send({ age: 30 });

            expect(createRes.status).toBe(400);
            expect(createRes.body).toHaveProperty("error");
        });

        it("returns 400 if age is missing", async () => {
            const createRes = await request(app)
                .post("/api/patients")
                .send({ name: "Alice" });

            expect(createRes.status).toBe(400);
            expect(createRes.body).toHaveProperty("error");
        });
    });

    describe("GET /api/patients", () => {
        it("returns an empty array when no patients exist", async () => {
            const listRes = await request(app).get("/api/patients");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(0);
        });

        it("returns all patients", async () => {
            await Patient.create({ name: "Alice", age: 25 });
            await Patient.create({ name: "Bob", age: 40 });

            const listRes = await request(app).get("/api/patients");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(2);
        });
    });

    describe("GET /api/patients/:id", () => {
        it("returns a patient by ID", async () => {
            const created = await Patient.create({ name: "Charlie", age: 35 });

            const getRes = await request(app).get(`/api/patients/${created._id}`);

            expect(getRes.status).toBe(200);
            expect(getRes.body.name).toBe("Charlie");
            expect(getRes.body.age).toBe(35);
        });

        it("returns 404 if patient does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const getRes = await request(app).get(`/api/patients/${fakeId}`);

            expect(getRes.status).toBe(404);
            expect(getRes.body).toHaveProperty("error");
        });
    });

    describe("PUT /api/patients/:id", () => {
        it("updates a patient successfully", async () => {
            const created = await Patient.create({ name: "Old Name", age: 20 });

            const updateRes = await request(app)
                .put(`/api/patients/${created._id}`)
                .send({ name: "New Name", age: 21 });

            expect(updateRes.status).toBe(200);
            expect(updateRes.body.name).toBe("New Name");
            expect(updateRes.body.age).toBe(21);
        });

        it("returns 404 if patient does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const updateRes = await request(app)
                .put(`/api/patients/${fakeId}`)
                .send({ name: "Test", age: 30 });

            expect(updateRes.status).toBe(404);
        });
    });

    describe("DELETE /api/patients/:id", () => {
        it("deletes a patient successfully", async () => {
            const created = await Patient.create({ name: "ToDelete", age: 50 });

            const deleteRes = await request(app).delete(`/api/patients/${created._id}`);

            expect(deleteRes.status).toBe(200);
            expect(deleteRes.body).toHaveProperty("message");

            // Verify it's deleted
            const patient = await Patient.findById(created._id);
            expect(patient).toBeNull();
        });

        it("returns 404 if patient does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const deleteRes = await request(app).delete(`/api/patients/${fakeId}`);

            expect(deleteRes.status).toBe(404);
        });
    });
});
