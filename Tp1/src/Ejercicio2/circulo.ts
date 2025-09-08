import { FiguraGeometrica} from "./figuragemotrica";

export class Circulo extends FiguraGeometrica {
    private radio : number;

    constructor(radio : number) {
        super("circulo");
        this.radio = radio;
    }

    calcularArea(): number {
        return Math.PI * this.radio * this.radio;
    }
}
