import { Cuadrado } from "./cuadrado";
import { Triangulo } from "./triangulo";
import { Circulo } from "./circulo";

const cuadrado = new Cuadrado(5);
console.log(`Área del cuadrado: ${cuadrado.calcularArea()}`);

const triangulo = new Triangulo(3, 5);
console.log(`Área del triángulo: ${triangulo.calcularArea()}`);

const circulo = new Circulo(2);
console.log(`Área del círculo: ${circulo.calcularArea()}`);
