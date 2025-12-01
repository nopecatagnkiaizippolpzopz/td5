import dotenv from "dotenv";
import { connectDB, closeDB } from "./src/db.js";
import Doctor from "./src/models/doctor.model.js";
import Patient from "./src/models/patient.model.js";
import Appointment from "./src/models/appointment.model.js";

// Load environment variables
dotenv.config({ path: ".env.aurel" });

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing collections
    console.log("Clearing existing data...");
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});

    // Seed doctors
    console.log("Seeding doctors...");
    const doctors = await Doctor.insertMany([
      { name: "Dr. Sarah Lee", specialty: "Cardiology" },
      { name: "Dr. Amir Khan", specialty: "Pediatrics" },
      { name: "Dr. Emma Wilson", specialty: "Neurology" },
      { name: "Dr. James Chen", specialty: "Orthopedics" },
      { name: "Dr. Maria Garcia", specialty: "Dermatology" }
    ]);

    console.log(`✓ Added ${doctors.length} doctors`);

    // Seed patients
    console.log("Seeding patients...");
    const patients = await Patient.insertMany([
      { name: "Alice", age: 34 },
      { name: "John", age: 45 },
      { name: "Marie", age: 29 },
      { name: "Robert", age: 52 },
      { name: "Sophie", age: 38 }
    ]);

    console.log(`✓ Added ${patients.length} patients`);

    // Seed appointments
    console.log("Seeding appointments...");
    const appointments = await Appointment.insertMany([
      {
        doctorId: doctors[0]._id,
        patientId: patients[0]._id,
        date: "2025-03-15",
        time: "10:00"
      },
      {
        doctorId: doctors[1]._id,
        patientId: patients[1]._id,
        date: "2025-03-16",
        time: "14:30"
      },
      {
        doctorId: doctors[2]._id,
        patientId: patients[2]._id,
        date: "2025-03-17",
        time: "09:00"
      },
      {
        doctorId: doctors[3]._id,
        patientId: patients[3]._id,
        date: "2025-03-18",
        time: "15:00"
      },
      {
        doctorId: doctors[4]._id,
        patientId: patients[4]._id,
        date: "2025-03-19",
        time: "11:30"
      }
    ]);

    console.log(`✓ Added ${appointments.length} appointments`);

    console.log("\n✅ Database seeded successfully!");
    console.log(`
    Summary:
    - Doctors: ${doctors.length}
    - Patients: ${patients.length}
    - Appointments: ${appointments.length}
    `);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await closeDB();
  }
}

seedDatabase();

