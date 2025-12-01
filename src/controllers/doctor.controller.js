import Doctor from "../models/doctor.model.js";

// GET all doctors
export async function listDoctors(req, res, next) {
    try {
        const doctors = await Doctor.find().lean();
        res.status(200).json(doctors);
    } catch (err) {
        next(err);
    }
}

// GET doctor by ID
export async function getDoctorById(req, res, next) {
    try {
        const doctor = await Doctor.findById(req.params.id).lean();
        if (!doctor) {
            return res.status(404).json({ error: "Doctor does not exist" });
        }
        res.json(doctor);
    } catch (err) {
        next(err);
    }
}

// POST create a new doctor
export async function createDoctor(req, res, next) {
    try {
        const { name, specialty } = req.body;
        if (!name || !specialty) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const created = await Doctor.create({ name, specialty });
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

// PUT update a doctor
export async function updateDoctor(req, res, next) {
    try {
        const { name, specialty } = req.body;
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { name, specialty },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedDoctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.json(updatedDoctor);
    } catch (err) {
        next(err);
    }
}

// DELETE a doctor
export async function deleteDoctor(req, res, next) {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ error: "Doctor did not exist" });
        }
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}
