import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import app from "../../src/app.js";
import Doctor from "../../src/models/doctor.model.js";

describe("Doctors API (integration)", () => {
    beforeEach(async () => {
        await Doctor.deleteMany({});
    });

    describe("POST /api/doctors", () => {
        it("creates a doctor and returns 201", async () => {
            const createRes = await request(app)
                .post("/api/doctors")
                .send({ name: "Dr. Integration", specialty: "Testing" });

            expect(createRes.status).toBe(201);
            expect(createRes.body).toHaveProperty("_id");
            expect(createRes.body.name).toBe("Dr. Integration");
            expect(createRes.body.specialty).toBe("Testing");
        });

        it("returns 400 if name is missing", async () => {
            const createRes = await request(app)
                .post("/api/doctors")
                .send({ specialty: "Testing" });

            expect(createRes.status).toBe(400);
            expect(createRes.body).toHaveProperty("error");
        });

        it("returns 400 if specialty is missing", async () => {
            const createRes = await request(app)
                .post("/api/doctors")
                .send({ name: "Dr. Test" });

            expect(createRes.status).toBe(400);
            expect(createRes.body).toHaveProperty("error");
        });
    });

    describe("GET /api/doctors", () => {
        it("returns an empty array when no doctors exist", async () => {
            const listRes = await request(app).get("/api/doctors");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(0);
        });

        it("returns all doctors", async () => {
            // Create two doctors
            await Doctor.create({ name: "Dr. One", specialty: "Cardiology" });
            await Doctor.create({ name: "Dr. Two", specialty: "Neurology" });

            const listRes = await request(app).get("/api/doctors");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(2);
        });
    });

    describe("GET /api/doctors/:id", () => {
        it("returns a doctor by ID", async () => {
            const created = await Doctor.create({
                name: "Dr. Single",
                specialty: "Pediatrics",
            });

            const getRes = await request(app).get(`/api/doctors/${created._id}`);

            expect(getRes.status).toBe(200);
            expect(getRes.body.name).toBe("Dr. Single");
            expect(getRes.body.specialty).toBe("Pediatrics");
        });

        it("returns 404 if doctor does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const getRes = await request(app).get(`/api/doctors/${fakeId}`);

            expect(getRes.status).toBe(404);
            expect(getRes.body).toHaveProperty("error");
        });
    });

    describe("PUT /api/doctors/:id", () => {
        it("updates a doctor successfully", async () => {
            const created = await Doctor.create({
                name: "Dr. Old",
                specialty: "Old Specialty",
            });

            const updateRes = await request(app)
                .put(`/api/doctors/${created._id}`)
                .send({ name: "Dr. Updated", specialty: "New Specialty" });

            expect(updateRes.status).toBe(200);
            expect(updateRes.body.name).toBe("Dr. Updated");
            expect(updateRes.body.specialty).toBe("New Specialty");
        });

        it("returns 404 if doctor does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const updateRes = await request(app)
                .put(`/api/doctors/${fakeId}`)
                .send({ name: "Dr. Test", specialty: "Test" });

            expect(updateRes.status).toBe(404);
        });
    });

    describe("DELETE /api/doctors/:id", () => {
        it("deletes a doctor successfully", async () => {
            const created = await Doctor.create({
                name: "Dr. ToDelete",
                specialty: "Surgery",
            });

            const deleteRes = await request(app).delete(`/api/doctors/${created._id}`);

            expect(deleteRes.status).toBe(204);

            // Verify it's deleted
            const doctor = await Doctor.findById(created._id);
            expect(doctor).toBeNull();
        });

        it("returns 404 if doctor does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const deleteRes = await request(app).delete(`/api/doctors/${fakeId}`);

            expect(deleteRes.status).toBe(404);
        });
    });

    describe("Full workflow test", () => {
        it("creates a doctor and then returns it in the list", async () => {
            // Create a new doctor
            const createRes = await request(app)
                .post("/api/doctors")
                .send({ name: "Dr. Workflow", specialty: "Testing Workflow" });

            expect(createRes.status).toBe(201);
            expect(createRes.body).toHaveProperty("_id");

            // List all doctors
            const listRes = await request(app).get("/api/doctors");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(1);
            expect(listRes.body[0].name).toBe("Dr. Workflow");
        });
    });
});
