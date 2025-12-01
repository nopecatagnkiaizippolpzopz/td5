import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "Patient ID is required"],
        },
        date: {
            type: String,
            required: [true, "Date is required"],
        },
        time: {
            type: String,
            required: [true, "Time is required"],
        },
        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled"],
            default: "scheduled",
        },
    },
    {
        timestamps: true,
    }
);

// Index to prevent double booking
appointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });

// Query helper to find upcoming appointments
appointmentSchema.query.upcoming = function () {
    return this.where({ status: "scheduled" });
};

// Populate doctor and patient details
appointmentSchema.methods.populateDetails = function () {
    return this.populate("doctorId patientId");
};

export default mongoose.model("Appointment", appointmentSchema, "appointments");
