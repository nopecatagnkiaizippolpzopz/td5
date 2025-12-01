import Appointment from "../models/appointment.model.js";

// GET all appointments
export async function listAppointments(req, res, next) {
    try {
        const appointments = await Appointment.find().lean();
        res.status(200).json(appointments);
    } catch (err) {
        next(err);
    }
}

// GET appointment by ID
export async function getAppointmentById(req, res, next) {
    try {
        const appointment = await Appointment.findById(req.params.id).lean();
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(appointment);
    } catch (err) {
        next(err);
    }
}

// POST create a new appointment
export async function createAppointment(req, res, next) {
    try {
        const { doctorId, patientId, date, time } = req.body;

        if (!doctorId || !patientId || !date || !time) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const created = await Appointment.create({
            doctorId,
            patientId,
            date,
            time,
        });
        res.status(201).json(created);
    } catch (err) {
        // Handle duplicate key error (double booking)
        if (err.code === 11000) {
            return res.status(409).json({
                error: "This time slot is already booked for this doctor"
            });
        }
        next(err);
    }
}

// PUT update an appointment
export async function updateAppointment(req, res, next) {
    try {
        const { doctorId, patientId, date, time } = req.body;

        if (!doctorId || !patientId || !date || !time) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { doctorId, patientId, date, time },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json(updatedAppointment);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                error: "This time slot is already booked for this doctor"
            });
        }
        next(err);
    }
}

// DELETE an appointment
export async function deleteAppointment(req, res, next) {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        next(err);
    }
}
