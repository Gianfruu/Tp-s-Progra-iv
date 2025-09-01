import Vehiculo from "./Vehiculo";
import Electrico from "./Electrico";

class AutoElectrico extends Vehiculo implements Electrico {
  public nivelBateria: number = 100;

  constructor(marca: string, modelo: string) {
    super(marca, modelo);
  }

  public cargar(porcentaje: number): void {
    if (porcentaje < 0) return;
    this.nivelBateria += porcentaje;
    if (this.nivelBateria > 100) this.nivelBateria = 100;
    console.log(`${this.marca} ${this.modelo} cargó batería al ${this.nivelBateria}%`);
  }

  public tocarBocina(): void {
    console.log("Bip bip eléctrico ");
  }

  public toString(): string {
    return `${super.toString()} - Batería: ${this.nivelBateria}%`;
  }
}

export default AutoElectrico;
