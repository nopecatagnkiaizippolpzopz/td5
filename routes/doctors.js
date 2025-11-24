import express from "express";
import { getDB } from "../src/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all doctors
router.get("/", async (req, res) => {
    try {
        const db = getDB();
        const doctors = await db.collection("doctors").find({}).toArray();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single doctor
router.get("/:id", async (req, res) => {
    try {
        const db = getDB();
        const id = new ObjectId(req.params.id);
        const doctor = await db.collection("doctors").findOne({ _id: id });
        if (!doctor) return res.status(404).json({ error: "Doctor does not exist" });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (update)
router.put("/:id", async (req, res) => {
    try {
        const db = getDB();
        const id = new ObjectId(req.params.id);
        const result = await db.collection("doctors").findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { returnDocument: "after" }
        );
        if (!result.value) return res.status(404).json({ error: "Doctor not found" });
        res.json(result.value);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// POST a new doctor
router.post("/", async (req, res) => {
    try {
        const { name, specialty } = req.body;
        if (!name || !specialty) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }
        const db = getDB();
        const newDoctor = { name, specialty };
        const result = await db.collection("doctors").insertOne(newDoctor);
        res.status(201).json({ _id: result.insertedId, ...newDoctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const db = getDB();
        const id = new ObjectId(req.params.id);
        const result = await db.collection("doctors").deleteOne({ _id: id });
        if (result.deletedCount === 0)
            return res.status(404).json({ error: "Doctor did not exist" });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
