import express from "express";
import { getDB } from "../src/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all patients
router.get("/", async (req, res) => {
    try {
        const db = getDB();
        const patients = await db.collection("patients").find({}).toArray();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new patient
router.post("/", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age)
            return res.status(400).json({ error: "Missing fields" });
        
        const db = getDB();
        const newPatient = { name, age };
        const result = await db.collection("patients").insertOne(newPatient);
        res.status(201).json({ _id: result.insertedId, ...newPatient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
