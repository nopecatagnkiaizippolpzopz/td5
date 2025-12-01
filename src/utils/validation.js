/**
 * Validates if a doctor object has all required fields
 * @param {Object} data - Doctor data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidDoctor(data) {
    if (!data) return false;
    if (!data.name || typeof data.name !== "string") return false;
    if (!data.specialty || typeof data.specialty !== "string") return false;
    return true;
}

/**
 * Validates if a patient object has all required fields
 * @param {Object} data - Patient data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidPatient(data) {
    if (!data) return false;
    if (!data.name || typeof data.name !== "string") return false;
    if (!data.age || typeof data.age !== "number") return false;
    if (data.age < 0 || data.age > 150) return false;
    return true;
}

/**
 * Validates if an appointment object has all required fields
 * @param {Object} data - Appointment data to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidAppointment(data) {
    if (!data) return false;
    if (!data.doctorId || typeof data.doctorId !== "string") return false;
    if (!data.patientId || typeof data.patientId !== "string") return false;
    if (!data.date || typeof data.date !== "string") return false;
    if (!data.time || typeof data.time !== "string") return false;
    return true;
}
