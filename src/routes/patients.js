import express from "express";
import {
    listPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
} from "../controllers/patient.controller.js";

const router = express.Router();

// GET all patients
router.get("/", listPatients);

// GET patient by id
router.get("/:id", getPatientById);

// POST new patient
router.post("/", createPatient);

// PUT update patient
router.put("/:id", updatePatient);

// DELETE patient
router.delete("/:id", deletePatient);

export default router;
