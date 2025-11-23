const hospitalName = "La Charité"

let doctors = ["Lee", "Khan", "Scie", "Gourk", "Tark"]
function doctorsQty() {return doctors.length};
let isHospitalOpen = true;

console.log(`welvome to ${hospitalName}, it is ${isHospitalOpen ? "open and we have "+doctorsQty()+" doctors available" : "closed"}`)

doctors.push("Aaag")
console.log("Doctors :")
for (const el of doctors) {
console.log(" - Dr. "+el)
}

function findDoctor(name) {
    if (doctors.includes(name)) return `Doctor ${name} found`
    return `Doctor ${name} not found`
}

console.log(findDoctor("Lee"))
console.log(findDoctor("EGNIZJ"))


const patient = {
    name: "Alice Martin",
    age: 34,
    conditions: ["diabetes", "hypertension"],
    doctor: { name: "Lee", specialty: "Cardiology" }
};

console.log(patient.name, "is treated by Dr.",patient.doctor.name, `(${patient.doctor.specialty})` )

patient.conditions.push("anxiety")
console.log(patient)




 const patients =
 [
 { id : 1 , name :
"Alice", age : 34 } ,
 { id : 2 , name :
"John", age : 45 } ,
 { id : 3 , name :
"Marie", age : 29 }
 ];

 function filterByAge(age) {
    return patients.filter((pat) => pat.age < age)
 }

 function addPatient(name, age) {
    patients.push({id: patients.length+1, name: name, age: age})
 }

 addPatient("eclou", 22)

console.log( filterByAge(35))