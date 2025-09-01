// Interface para auto eléctrico
export default interface Electrico {
  nivelBateria: number;         
  cargar(porcentaje: number): void;
}
