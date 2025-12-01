import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import app from "../../src/app.js";
import Appointment from "../../src/models/appointment.model.js";
import Doctor from "../../src/models/doctor.model.js";
import Patient from "../../src/models/patient.model.js";

describe("Appointments API (integration)", () => {
    let doctorId;
    let patientId;

    beforeEach(async () => {
        // Clean all collections
        await Appointment.deleteMany({});
        await Doctor.deleteMany({});
        await Patient.deleteMany({});

        // Create a doctor and patient for appointments
        const doctor = await Doctor.create({
            name: "Dr. Appointment",
            specialty: "General",
        });
        const patient = await Patient.create({ name: "Patient Test", age: 30 });

        doctorId = doctor._id.toString();
        patientId = patient._id.toString();
    });

    describe("POST /api/appointments", () => {
        it("creates an appointment and returns 201", async () => {
            const createRes = await request(app)
                .post("/api/appointments")
                .send({
                    doctorId,
                    patientId,
                    date: "2025-04-15",
                    time: "11:00",
                });

            expect(createRes.status).toBe(201);
            expect(createRes.body).toHaveProperty("_id");
            expect(createRes.body.date).toBe("2025-04-15");
            expect(createRes.body.time).toBe("11:00");
        });

        it("returns 400 if required fields are missing", async () => {
            const createRes = await request(app)
                .post("/api/appointments")
                .send({
                    doctorId,
                    date: "2025-04-15",
                });

            expect(createRes.status).toBe(400);
            expect(createRes.body).toHaveProperty("error");
        });
    });

    describe("GET /api/appointments", () => {
        it("returns an empty array when no appointments exist", async () => {
            const listRes = await request(app).get("/api/appointments");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(0);
        });

        it("returns all appointments", async () => {
            await Appointment.create({
                doctorId,
                patientId,
                date: "2025-04-15",
                time: "10:00",
            });
            await Appointment.create({
                doctorId,
                patientId,
                date: "2025-04-16",
                time: "14:00",
            });

            const listRes = await request(app).get("/api/appointments");

            expect(listRes.status).toBe(200);
            expect(Array.isArray(listRes.body)).toBe(true);
            expect(listRes.body.length).toBe(2);
        });
    });

    describe("GET /api/appointments/:id", () => {
        it("returns an appointment by ID", async () => {
            const created = await Appointment.create({
                doctorId,
                patientId,
                date: "2025-04-15",
                time: "09:00",
            });

            const getRes = await request(app).get(`/api/appointments/${created._id}`);

            expect(getRes.status).toBe(200);
            expect(getRes.body.date).toBe("2025-04-15");
            expect(getRes.body.time).toBe("09:00");
        });

        it("returns 404 if appointment does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const getRes = await request(app).get(`/api/appointments/${fakeId}`);

            expect(getRes.status).toBe(404);
            expect(getRes.body).toHaveProperty("error");
        });
    });

    describe("PUT /api/appointments/:id", () => {
        it("updates an appointment successfully", async () => {
            const created = await Appointment.create({
                doctorId,
                patientId,
                date: "2025-04-15",
                time: "10:00",
            });

            const updateRes = await request(app)
                .put(`/api/appointments/${created._id}`)
                .send({
                    doctorId,
                    patientId,
                    date: "2025-04-16",
                    time: "15:00",
                });

            expect(updateRes.status).toBe(200);
            expect(updateRes.body.date).toBe("2025-04-16");
            expect(updateRes.body.time).toBe("15:00");
        });

        it("returns 404 if appointment does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const updateRes = await request(app)
                .put(`/api/appointments/${fakeId}`)
                .send({
                    doctorId,
                    patientId,
                    date: "2025-04-16",
                    time: "15:00",
                });

            expect(updateRes.status).toBe(404);
        });
    });

    describe("DELETE /api/appointments/:id", () => {
        it("deletes an appointment successfully", async () => {
            const created = await Appointment.create({
                doctorId,
                patientId,
                date: "2025-04-15",
                time: "10:00",
            });

            const deleteRes = await request(app).delete(
                `/api/appointments/${created._id}`
            );

            expect(deleteRes.status).toBe(200);
            expect(deleteRes.body).toHaveProperty("message");

            // Verify it's deleted
            const appointment = await Appointment.findById(created._id);
            expect(appointment).toBeNull();
        });

        it("returns 404 if appointment does not exist", async () => {
            const fakeId = "507f1f77bcf86cd799439011";
            const deleteRes = await request(app).delete(`/api/appointments/${fakeId}`);

            expect(deleteRes.status).toBe(404);
        });
    });
});
