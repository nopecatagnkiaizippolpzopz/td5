import { beforeAll, afterAll, beforeEach } from "vitest";
import { connectDB, closeDB } from "../src/db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables (.env.aurel first, then .env)
dotenv.config({ path: join(__dirname, "..", ".env.aurel") });
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: join(__dirname, "..", ".env") });
}

// If still no MongoDB URI, use the test database from environment variable
// This allows tests to run with the same database as development
if (!process.env.MONGODB_URI) {
    console.warn("Warning: MONGODB_URI not found in environment. Tests may fail.");
    console.warn("Please create a .env file with your MongoDB connection string.");
}

// Connect to test database before all tests
beforeAll(async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is required for tests");
    }
    await connectDB();
});

// Close database connection after all tests
afterAll(async () => {
    await closeDB();
});

// Clear all collections before each test
beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});
