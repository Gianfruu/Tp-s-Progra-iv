// Interfaz que define el comportamiento de un animal
interface Animal {
  hacerSonido(): void;
  moverse(): void;
}

// Interfaz que extiende Animal y añade un nuevo método
class Perro implements Animal {


  hacerSonido(): void {
    console.log("Guau");
  }

  moverse(): void {
    console.log("El perro corre");
  }
}

const miPerro = new Perro();
miPerro.hacerSonido(); // "Guau!"
miPerro.moverse();     // "El perro corre"
