
export const hospitalName = "La Charité"

export let doctors = ["Lee", "Khan", "Scie", "Gourk", "Tark"]
export function doctorsQty() { return doctors.length };
export let isHospitalOpen = true;

export function findDoctor(name) {
    if (doctors.includes(name)) return `Doctor ${name} found`
    return `Doctor ${name} not found`
}

export function addDoctor(name) {
    doctors.push(name)
}






export const patients =
    [
        {
            id: 1, name:
                "Alice", age: 34
        },
        {
            id: 2, name:
                "John", age: 45
        },
        {
            id: 3, name:
                "Marie", age: 29
        }
    ];

export function filterByAge(age) {
    return patients.filter((pat) => pat.age < age)
}

export function addPatient(name, age) {
    patients.push({ id: patients.length + 1, name: name, age: age })
}


export function createAppointment(doctor, patient, date) {
    if (!doctor || !patient || !date) {
        throw new Error("Missing required fields");
    }
    return { doctor, patient, date };
}
