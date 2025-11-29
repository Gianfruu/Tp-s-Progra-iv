import Vehiculo from "./Vehiculo";

class AutoNafta extends Vehiculo {
  private puertas: number;
  private tanque: number; 

  constructor(marca: string, modelo: string, puertas: number = 4, tanque: number = 50) {
    super(marca, modelo);
    this.puertas = puertas;
    this.tanque = tanque;
  }

  public cargarNafta(litros: number): void {
    if (litros <= 0) return;
    this.tanque += litros;
    if (this.tanque > 60) this.tanque = 60; 
  }

  // Override para simular consumo
  public acelerar(delta: number): void {
    if (!this.encendido || delta <= 0) return;
    if (this.tanque <= 0) {
      console.log("El tanque está vacío. No se puede acelerar.");
      return;
    }
    this.velocidad += delta;
    this.tanque -= delta * 0.1; // consumo aproximado
    if (this.tanque < 0) this.tanque = 0;
  }

  public tocarBocina(): void {
    console.log(`${this.marca} ${this.modelo} (nafta) dice: ¡POOOOM!`);
  }

  public status(): string {
    return `${this.toString()} | puertas: ${this.puertas} | tanque: ${this.tanque.toFixed(1)}L`;
  }
}

export default AutoNafta;
