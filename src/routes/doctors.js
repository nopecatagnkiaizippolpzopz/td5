import express from "express";
import {
    listDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} from "../controllers/doctor.controller.js";

const router = express.Router();

// GET all doctors
router.get("/", listDoctors);

// GET single doctor
router.get("/:id", getDoctorById);

// POST a new doctor
router.post("/", createDoctor);

// PUT (update) a doctor
router.put("/:id", updateDoctor);

// DELETE a doctor
router.delete("/:id", deleteDoctor);

export default router;
