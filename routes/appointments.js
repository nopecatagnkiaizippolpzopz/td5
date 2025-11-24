import express from "express";
import { getDB } from "../src/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all appointments
router.get("/", async (req, res) => {
    try {
        const db = getDB();
        const appointments = await db.collection("appointments").find({}).toArray();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET appointment by id
router.get("/:id", async (req, res) => {
    try {
        const db = getDB();
        const appointment = await db.collection("appointments").findOne({ _id: new ObjectId(req.params.id) });
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new appointment
router.post("/", async (req, res) => {
    try {
        const { doctorId, patientId, date, time } = req.body;
        
        if (!doctorId || !patientId || !date || !time) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        const db = getDB();
        const newAppointment = { 
            doctorId: new ObjectId(doctorId),
            patientId: new ObjectId(patientId),
            date, 
            time 
        };
        
        const result = await db.collection("appointments").insertOne(newAppointment);
        res.status(201).json({ _id: result.insertedId, ...newAppointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update appointment
router.put("/:id", async (req, res) => {
    try {
        const { doctorId, patientId, date, time } = req.body;
        
        if (!doctorId || !patientId || !date || !time) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        
        const db = getDB();
        const result = await db.collection("appointments").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { 
                doctorId: new ObjectId(doctorId),
                patientId: new ObjectId(patientId),
                date, 
                time 
            }}
        );
        
        if (result.matchedCount === 0)
            return res.status(404).json({ error: "Appointment not found" });
        
        res.json({ 
            _id: req.params.id, 
            doctorId: new ObjectId(doctorId),
            patientId: new ObjectId(patientId),
            date, 
            time 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection("appointments").deleteOne({ _id: new ObjectId(req.params.id) });
        
        if (result.deletedCount === 0)
            return res.status(404).json({ error: "Appointment not found" });
        
        res.json({ message: "Appointment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
