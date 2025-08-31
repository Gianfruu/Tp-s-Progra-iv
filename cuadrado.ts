import { FiguraGeometrica } from "./figuragemotrica";

export class Cuadrado extends FiguraGeometrica {
  private lado: number; //declara un atributo llamado lado

  constructor(lado: number) {
    super("cuadrado"); //le dice a figurageometrica el nombre de esta subclase
    this.lado = lado;
  }

  calcularArea(): number {
    return this.lado * this.lado;
  }
}
