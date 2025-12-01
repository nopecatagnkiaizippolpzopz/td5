import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
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

// Query helper to find active doctors
doctorSchema.query.active = function () {
  return this.where({ active: true });
};

// Instance method to deactivate a doctor
doctorSchema.methods.deactivate = function () {
  this.active = false;
  return this.save();
};

export default mongoose.model("Doctor", doctorSchema, "doctors");
