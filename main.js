// utils / hello . js
// routes / hello . route . js
import express from "express";
import {addDoctor, doctors, createAppointment} from "./hospitalData.js";
// import { sayHello } from "./utils/hello.js";
// const router = express.Router();
// router.get(" / ", (req, res) => res.send(sayHello(" Dr . Lee ")))
// export default router;



 addDoctor ( "Lee" ) ;
 console . log ( " Updated doctors : " , doctors ) ;


 try {
    console.log(createAppointment("Lee", "Alice", "2025 -03 -15"));
    console.log(createAppointment("Lee")); // should trigger error
} catch (err) {
    console.error("Error :", err.message);
}
