import { connectDB, closeDB } from "./src/db.js";

async function seedDatabase() {
  try {
    const db = await connectDB();
    
    // Clear existing collections
    console.log("Clearing existing data...");
    await db.collection("doctors").deleteMany({});
    await db.collection("patients").deleteMany({});
    await db.collection("appointments").deleteMany({});
    
    // Seed doctors
    console.log("Seeding doctors...");
    const doctorsResult = await db.collection("doctors").insertMany([
      { name: "Dr. Sarah Lee", specialty: "Cardiology" },
      { name: "Dr. Amir Khan", specialty: "Pediatrics" },
      { name: "Dr. Emma Wilson", specialty: "Neurology" },
      { name: "Dr. James Chen", specialty: "Orthopedics" },
      { name: "Dr. Maria Garcia", specialty: "Dermatology" }
    ]);
    
    const doctorIds = Object.values(doctorsResult.insertedIds);
    console.log(`✓ Added ${doctorIds.length} doctors`);
    
    // Seed patients
    console.log("Seeding patients...");
    const patientsResult = await db.collection("patients").insertMany([
      { name: "Alice", age: 34 },
      { name: "John", age: 45 },
      { name: "Marie", age: 29 },
      { name: "Robert", age: 52 },
      { name: "Sophie", age: 38 }
    ]);
    
    const patientIds = Object.values(patientsResult.insertedIds);
    console.log(`✓ Added ${patientIds.length} patients`);
    
    // Seed appointments
    console.log("Seeding appointments...");
    const appointmentsResult = await db.collection("appointments").insertMany([
      { 
        doctorId: doctorIds[0], 
        patientId: patientIds[0], 
        date: "2025-03-15", 
        time: "10:00" 
      },
      { 
        doctorId: doctorIds[1], 
        patientId: patientIds[1], 
        date: "2025-03-16", 
        time: "14:30" 
      },
      { 
        doctorId: doctorIds[2], 
        patientId: patientIds[2], 
        date: "2025-03-17", 
        time: "09:00" 
      },
      { 
        doctorId: doctorIds[3], 
        patientId: patientIds[3], 
        date: "2025-03-18", 
        time: "15:00" 
      },
      { 
        doctorId: doctorIds[4], 
        patientId: patientIds[4], 
        date: "2025-03-19", 
        time: "11:30" 
      }
    ]);
    
    console.log(`✓ Added ${appointmentsResult.insertedCount} appointments`);
    
    console.log("\n✅ Database seeded successfully!");
    console.log(`
    Summary:
    - Doctors: ${doctorIds.length}
    - Patients: ${patientIds.length}
    - Appointments: ${appointmentsResult.insertedCount}
    `);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await closeDB();
  }
}

seedDatabase();
