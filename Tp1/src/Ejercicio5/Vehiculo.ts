// Clase abstracta 
abstract class Vehiculo {
  protected marca: string;
  protected modelo: string;
  protected velocidad: number = 0;
  protected encendido: boolean = false;

  constructor(marca: string, modelo: string) {
    this.marca = marca;
    this.modelo = modelo;
  }

  public encender(): void {
    if (!this.encendido) this.encendido = true;
  }

  public apagar(): void {
    if (this.encendido) {
      this.encendido = false;
      this.velocidad = 0;
    }
  }

  public acelerar(delta: number): void {
    if (!this.encendido) return;
    if (delta < 0) return;
    this.velocidad += delta;
  }

  public frenar(delta: number): void {
    if (delta < 0) return;
    this.velocidad -= delta;
    if (this.velocidad < 0) this.velocidad = 0;
  }

  public getVelocidad(): number {
    return this.velocidad;
  }

  public toString(): string {
    return `${this.marca} ${this.modelo} (vel: ${this.velocidad} km/h, encendido: ${this.encendido})`;
  }

  
  public abstract tocarBocina(): void;
  public abstract status(): string;
}

export default Vehiculo;
