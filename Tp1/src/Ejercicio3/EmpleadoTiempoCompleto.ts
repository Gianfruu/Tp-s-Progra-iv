import { Empleado } from "./Empleado.abstract";

export class EmpleadoTiempoCompleto extends Empleado {
    salarioBase: number;
    nombre: string;

    constructor(nombre: string) {
        super()
        this.nombre = nombre;
    }

    calcularSalario(): number {
        return this.salarioBase + 20000;
    }
}