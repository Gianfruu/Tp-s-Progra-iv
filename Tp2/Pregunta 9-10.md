 9. ¿Por qué no perseguir 100% de cobertura a toda costa?

no es recomendable porque algunas partes del codigo como los setters y getters no aportan un valor real el testearlos, 
ademas el testearlo TODO nos puede llegar a distraer del objetivo principal el cual es el validar el comportamiento importante, reglas de negocio etc

10. Defina y dé un ejemplo de helper/builder para tests
    
  Un helper/builder: es una funcion que ayuda a crear datos falsos de forma clara y facil de volver a usar

Ejemplo:
```js
function buildOrder(overrides = {}) {
  return {
    tamanio: "M",
    toppings: ["queso", "tomate"],
    direccion: "Calle Falsa 123",
    ...overrides,
  };
}

// En los tests
const pedido = buildOrder({ tamanio: "L", toppings: ["salame"] });
```