import express from "express";
import doctorsRouter from "../routes/doctors.js";
import patientsRouter from "../routes/patients.js";

const app = express();

app.use(express.json());

app.use("/api/doctors", doctorsRouter);
app.use("/api/patients", patientsRouter);

export default app;
