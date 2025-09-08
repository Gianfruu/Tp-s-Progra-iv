import { Empleado } from "./Empleado.abstract";

export class EmpleadoMedioTiempo extends Empleado {
    salarioBase: number;
    nombre: string;

    constructor(nombre: string) {
        super()
        this.nombre = nombre;
    }

    calcularSalario(): number {
        return this.salarioBase * 0.5;
    }
}