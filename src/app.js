import express from "express";
import doctorsRouter from "../routes/doctors.js";
import patientsRouter from "../routes/patients.js";
import appointmentsRouter from "../routes/appointments.js";
import metricsRouter from "../routes/metrics.js";
import { connectDB } from "./db.js";

const app = express();

// Initialize database connection
export async function initializeApp() {
  await connectDB();
  return app;
}

app.use(express.json());

app.use("/api/doctors", doctorsRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/metrics", metricsRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: " Internal server error"
    })
})


export default app;
