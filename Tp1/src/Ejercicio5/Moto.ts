import Vehiculo from "./Vehiculo";

class Moto extends Vehiculo {
  private cilindrada: number;

  constructor(marca: string, modelo: string, cilindrada: number = 150) {
    super(marca, modelo);
    this.cilindrada = cilindrada;
  }

  public tocarBocina(): void {
    console.log(`${this.marca} ${this.modelo} (moto) dice: ¡pi-pi!`);
  }

  public status(): string {
    return `${this.toString()} | cilindrada: ${this.cilindrada}cc`;
  }
}

export default Moto;
