import { describe, it, expect } from "vitest";
import {
    isValidDoctor,
    isValidPatient,
    isValidAppointment,
} from "../../src/utils/validation.js";

describe("isValidDoctor", () => {
    it("returns true for a valid doctor object", () => {
        const doctor = { name: "Dr. Test", specialty: "Cardiology" };
        expect(isValidDoctor(doctor)).toBe(true);
    });

    it("returns false if name is missing", () => {
        const doctor = { specialty: "Cardiology" };
        expect(isValidDoctor(doctor)).toBe(false);
    });

    it("returns false if specialty is missing", () => {
        const doctor = { name: "Dr. Test" };
        expect(isValidDoctor(doctor)).toBe(false);
    });

    it("returns false if name is not a string", () => {
        const doctor = { name: 123, specialty: "Cardiology" };
        expect(isValidDoctor(doctor)).toBe(false);
    });

    it("returns false if specialty is not a string", () => {
        const doctor = { name: "Dr. Test", specialty: 42 };
        expect(isValidDoctor(doctor)).toBe(false);
    });

    it("returns false if data is null", () => {
        expect(isValidDoctor(null)).toBe(false);
    });

    it("returns false if data is undefined", () => {
        expect(isValidDoctor(undefined)).toBe(false);
    });
});

describe("isValidPatient", () => {
    it("returns true for a valid patient object", () => {
        const patient = { name: "Alice", age: 30 };
        expect(isValidPatient(patient)).toBe(true);
    });

    it("returns false if name is missing", () => {
        const patient = { age: 30 };
        expect(isValidPatient(patient)).toBe(false);
    });

    it("returns false if age is missing", () => {
        const patient = { name: "Alice" };
        expect(isValidPatient(patient)).toBe(false);
    });

    it("returns false if age is negative", () => {
        const patient = { name: "Alice", age: -5 };
        expect(isValidPatient(patient)).toBe(false);
    });

    it("returns false if age is too high", () => {
        const patient = { name: "Alice", age: 200 };
        expect(isValidPatient(patient)).toBe(false);
    });

    it("returns false if age is not a number", () => {
        const patient = { name: "Alice", age: "thirty" };
        expect(isValidPatient(patient)).toBe(false);
    });
});

describe("isValidAppointment", () => {
    it("returns true for a valid appointment object", () => {
        const appointment = {
            doctorId: "507f1f77bcf86cd799439011",
            patientId: "507f191e810c19729de860ea",
            date: "2025-04-15",
            time: "11:00",
        };
        expect(isValidAppointment(appointment)).toBe(true);
    });

    it("returns false if doctorId is missing", () => {
        const appointment = {
            patientId: "507f191e810c19729de860ea",
            date: "2025-04-15",
            time: "11:00",
        };
        expect(isValidAppointment(appointment)).toBe(false);
    });

    it("returns false if patientId is missing", () => {
        const appointment = {
            doctorId: "507f1f77bcf86cd799439011",
            date: "2025-04-15",
            time: "11:00",
        };
        expect(isValidAppointment(appointment)).toBe(false);
    });

    it("returns false if date is missing", () => {
        const appointment = {
            doctorId: "507f1f77bcf86cd799439011",
            patientId: "507f191e810c19729de860ea",
            time: "11:00",
        };
        expect(isValidAppointment(appointment)).toBe(false);
    });

    it("returns false if time is missing", () => {
        const appointment = {
            doctorId: "507f1f77bcf86cd799439011",
            patientId: "507f191e810c19729de860ea",
            date: "2025-04-15",
        };
        expect(isValidAppointment(appointment)).toBe(false);
    });
});
