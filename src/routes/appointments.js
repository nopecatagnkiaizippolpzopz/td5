import express from "express";
import {
    listAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();

// GET all appointments
router.get("/", listAppointments);

// GET appointment by id
router.get("/:id", getAppointmentById);

// POST new appointment
router.post("/", createAppointment);

// PUT update appointment
router.put("/:id", updateAppointment);

// DELETE appointment
router.delete("/:id", deleteAppointment);

export default router;
