import express from "express";
const router = express.Router();

let appointments = [
    { id: 1, doctorId: 1, patientId: 1, date: "2025-03-15", time: "10:00" },
    { id: 2, doctorId: 2, patientId: 2, date: "2025-03-16", time: "14:30" }
];

// GET all appointments
router.get("/", (req, res) => res.json(appointments));

// POST new appointment
router.post("/", (req, res) => {
    const { doctorId, patientId, date, time } = req.body;
    
    if (!doctorId || !patientId || !date || !time) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    const newAppointment = { 
        id: appointments.length + 1, 
        doctorId, 
        patientId, 
        date, 
        time 
    };
    
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
});

export default router;
