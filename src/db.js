import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to load from .env.aurel first, then fall back to .env
dotenv.config({ path: join(__dirname, "..", ".env.aurel") });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: join(__dirname, "..", ".env") });
}

const uri = process.env.MONGODB_URI;

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "healthcare",
    });
    isConnected = true;
    console.log("Connected to MongoDB with Mongoose!");
    console.log("Database:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

// Get the Mongoose connection
export function getDB() {
  if (!mongoose.connection || !isConnected) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return mongoose.connection.db;
}

// Close the database connection
export async function closeDB() {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
    console.log("MongoDB connection closed");
  }
}

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
  isConnected = false;
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
