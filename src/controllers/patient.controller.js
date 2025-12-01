import Patient from "../models/patient.model.js";

// GET all patients
export async function listPatients(req, res, next) {
    try {
        const patients = await Patient.find().lean();
        res.status(200).json(patients);
    } catch (err) {
        next(err);
    }
}

// GET patient by ID
export async function getPatientById(req, res, next) {
    try {
        const patient = await Patient.findById(req.params.id).lean();
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json(patient);
    } catch (err) {
        next(err);
    }
}

// POST create a new patient
export async function createPatient(req, res, next) {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: "Missing fields" });
        }
        const created = await Patient.create({ name, age });
        res.status(201).json(created);
    } catch (err) {
        next(err);
    }
}

// PUT update a patient
export async function updatePatient(req, res, next) {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { name, age },
            { new: true, runValidators: true }
        ).lean();

        if (!updatedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json(updatedPatient);
    } catch (err) {
        next(err);
    }
}

// DELETE a patient
export async function deletePatient(req, res, next) {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json({ message: "Patient deleted" });
    } catch (err) {
        next(err);
    }
}
