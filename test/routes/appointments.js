import request from "supertest";
import app, { initializeApp } from "../../src/app.js";
import { closeDB, getDB } from "../../src/db.js";

describe("Appointments API", () => {
    let testDoctorId;
    let testPatientId;
    let createdAppointmentId;

    beforeAll(async () => {
        await initializeApp();
        
        // Create test doctor and patient
        const db = getDB();
        const doctor = await db.collection("doctors").insertOne({
            name: "Dr. Test",
            specialty: "Testing"
        });
        testDoctorId = doctor.insertedId.toString();
        
        const patient = await db.collection("patients").insertOne({
            name: "Test Patient",
            age: 30
        });
        testPatientId = patient.insertedId.toString();
    });

    afterAll(async () => {
        // Clean up test data
        const db = getDB();
        await db.collection("doctors").deleteMany({ name: "Dr. Test" });
        await db.collection("patients").deleteMany({ name: "Test Patient" });
        if (createdAppointmentId) {
            await db.collection("appointments").deleteMany({ _id: createdAppointmentId });
        }
        await closeDB();
    });

    it("GET /api/appointments should return an array", async () => {
        const res = await request(app).get("/api/appointments");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("POST /api/appointments should add a new appointment", async () => {
        const res = await request(app)
            .post("/api/appointments")
            .send({ 
                doctorId: testDoctorId, 
                patientId: testPatientId, 
                date: "2025-04-10", 
                time: "09:00" 
            });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.doctorId).toBeDefined();
        expect(res.body.patientId).toBeDefined();
        expect(res.body.date).toBe("2025-04-10");
        expect(res.body.time).toBe("09:00");
        
        createdAppointmentId = res.body._id;
    });

    it("POST /api/appointments should fail without required fields", async () => {
        const res = await request(app)
            .post("/api/appointments")
            .send({ doctorId: testDoctorId, patientId: testPatientId });
        
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error");
    });
});
