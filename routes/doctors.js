import express from "express";
const router = express.Router();
const doctors = [
    { id: 1, name: "Dr. Sarah Lee", specialty: "Cardiology" },
    { id: 2, name: "Dr. Amir Khan", specialty: "Pediatrics" },
    { id: 3, name: "Dr. Emma Wilson", specialty: "Neurology" },
    { id: 4, name: "Dr. James Chen", specialty: "Orthopedics" },
    { id: 5, name: "Dr. Maria Garcia", specialty: "Dermatology" }
];
// GET all doctors
router.get("/", (req, res) => res.status(200).json(doctors));
// POST a new doctor
router.post("/", (req, res) => {
    const { name, specialty } = req.body;
    if (!name || !specialty) {
        return res.status(400).json({
            error: "Missing required fields"
        });
    }
    const newDoctor = { id: doctors.length + 1, name, specialty };

    doctors.push(newDoctor);
    res.status(201).json(newDoctor);
});
export default router;
