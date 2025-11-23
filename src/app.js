import express from "express";
import doctorsRouter from "../routes/doctors.js";
import patientsRouter from "../routes/patients.js";
import appointmentsRouter from "../routes/appointments.js";
import metricsRouter from "../routes/metrics.js";

const app = express();

app.use(express.json());

app.use("/api/doctors", doctorsRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/metrics", metricsRouter);

export default app;
