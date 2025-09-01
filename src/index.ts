import Auto from "./Auto";
import Moto from "./Moto";
import AutoNafta from "./AutoNafta";

const autoElectrico = new Auto("Tesla", "Model 3", 4);
const moto = new Moto("Yamaha", "FZ", 150);
const autoNafta = new AutoNafta("Ford", "Focus", 4, 45);

// Auto eléctrico
console.log("=== AUTO ELÉCTRICO ===");
console.log(autoElectrico.status());
autoElectrico.encender();
autoElectrico.acelerar(30);
autoElectrico.frenar(10);
autoElectrico.cargar(5);
console.log(autoElectrico.status());
autoElectrico.tocarBocina();

// Moto
console.log("\n=== MOTO ===");
console.log(moto.status());
moto.encender();
moto.acelerar(50);
moto.apagar();
console.log(moto.status());
moto.tocarBocina();

// Auto a nafta
console.log("\n=== AUTO A NAFTA ===");
console.log(autoNafta.status());
autoNafta.encender();
autoNafta.acelerar(60);
console.log(autoNafta.status());
autoNafta.tocarBocina();
