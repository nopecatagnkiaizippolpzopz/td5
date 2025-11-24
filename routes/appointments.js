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

export default router;
