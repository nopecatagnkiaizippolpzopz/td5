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

// GET patient by id
router.get("/:id", async (req, res) => {
    try {
        const db = getDB();
        const patient = await db.collection("patients").findOne({ _id: new ObjectId(req.params.id) });
        if (!patient) return res.status(404).json({ error: "Patient not found" });
        res.json(patient);
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

// PUT update patient
router.put("/:id", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age)
            return res.status(400).json({ error: "Missing fields" });
        
        const db = getDB();
        const result = await db.collection("patients").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { name, age } }
        );
        
        if (result.matchedCount === 0)
            return res.status(404).json({ error: "Patient not found" });
        
        res.json({ _id: req.params.id, name, age });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE patient
router.delete("/:id", async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection("patients").deleteOne({ _id: new ObjectId(req.params.id) });
        
        if (result.deletedCount === 0)
            return res.status(404).json({ error: "Patient not found" });
        
        res.json({ message: "Patient deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
