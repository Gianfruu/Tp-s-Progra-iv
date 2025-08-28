import { Empleado } from "./Empleado.abstract";
import { EmpleadoMedioTiempo } from "./EmpleadoMedioTiempo";
import { EmpleadoTiempoCompleto } from "./EmpleadoTiempoCompleto";

let emp1: Empleado = new EmpleadoTiempoCompleto("Pepe");
// Pepe deberia cobrar el base (10.000) mas 20.000, osea 30.000

let emp2: Empleado = new EmpleadoMedioTiempo("Juan");
// Juan deberia cobrar la mitad del base (10.000), osea 5000

let empArray: Empleado[] = [emp1, emp2]

for (let i = 0; i < empArray.length; i++) {
    let actualEmp = empArray[i];
    console.log(`El empleado ${actualEmp.nombre} cobra ${actualEmp.calcularSalario()}`)
}
