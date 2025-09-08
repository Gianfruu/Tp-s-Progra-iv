// interfaz Volador
interface Volador {
    volar(): void;
}

// Clase base Animal
class Animal {
    protected nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    hacerSonido(): void {
        console.log(`${this.nombre} hace un sonido`);
    }
}

// Clase Pájaro, que hereda de Animal e implementa Volador
class Pajaro extends Animal implements Volador {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    volar(): void {
        console.log(`${this.nombre} está volando`);
    }

    hacerSonido(): void {
        console.log(`${this.nombre}, el ${this.especie}, canta`);
    }
}

// Clase Zorro, solo hereda de Animal
class Zorro extends Animal {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(`${this.nombre}, el ${this.especie}, aúlla`);
    }
}