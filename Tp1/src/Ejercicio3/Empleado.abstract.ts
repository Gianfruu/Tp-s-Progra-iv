export abstract class Empleado {
    nombre: string;
    salarioBase: number = 10000;
    abstract calcularSalario(): number;
}