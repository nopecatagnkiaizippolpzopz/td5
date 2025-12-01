import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Patient name is required"],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [0, "Age must be a positive number"],
            max: [150, "Age must be realistic"],
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Query helper to find active patients
patientSchema.query.active = function () {
    return this.where({ active: true });
};

// Virtual property to check if patient is a minor
patientSchema.virtual("isMinor").get(function () {
    return this.age < 18;
});

// Ensure virtuals are included when converting to JSON
patientSchema.set("toJSON", { virtuals: true });
patientSchema.set("toObject", { virtuals: true });

export default mongoose.model("Patient", patientSchema, "patients");
