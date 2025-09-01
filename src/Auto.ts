import Vehiculo from "./Vehiculo";
import Electrico from "./Electrico";

class Auto extends Vehiculo implements Electrico {
  private puertas: number;
  public nivelBateria: number = 100;

  constructor(marca: string, modelo: string, puertas: number = 4) {
    super(marca, modelo);
    this.puertas = puertas;
  }

  public cargar(porcentaje: number): void {
    if (porcentaje <= 0) return;
    this.nivelBateria += porcentaje;
    if (this.nivelBateria > 100) this.nivelBateria = 100;
  }

  public tocarBocina(): void {
    console.log(`${this.marca} ${this.modelo} dice: ¡piii!`);
  }

  public status(): string {
    return `${this.toString()} | puertas: ${this.puertas} | batería: ${this.nivelBateria}%`;
  }
}

export default Auto;
