# Trabajo Practico N°2

# 4) Preguntas de teoría (comunes para todos)

Responda en un archivo TEORIA.md (máx. 1–2 párrafos por ítem, salvo que se pida código)

---

 ### 1. Explique el ciclo Rojo → Verde → Refactor y por qué es importante el tamaño de los pasos

  El **Ciclo TDD** se basa en tres pasos: 
  ***Rojo***: Escribir un test que falla, porque la funcionalidad aún no existe.
  ***Verde***: Implementar la mínima lógica necesaria para que ese test pase.
  ***Refactor***: Mejorar el código manteniendo todos los tests en verde.
  Es importante que los pasos sean pequeños, porque así los errores se detectan rápido y se reduce la complejidad al avanzar de forma incremental y segura.

---

### 2. Diferencie tests unitarios, de integración y E2E en APIs

  * **Unitarios**
  Prueban funciones o clases aisladas, sin dependencias externas. Esto se consigue “mockeando” o “stubbeando” las dependencias. Son rápidos y fáciles de correr.

  * **Integración**
  Comprueban cómo interactúan varias partes del sistema. En APIs, significa montar rutas de Express y verificar peticiones/respuestas usando Supertest, sin necesidad de levantar un servidor real.

  * **End-to-End (E2E)**
  Simulan el flujo completo, desde el cliente hasta la base de datos real y el servidor en ejecución. Son más lentos pero garantizan que todo el sistema funciona como un todo. Se pueden usar herramientas como Cypress, Playwright o Postman/Newman.

---

### 3. ¿Qué es un doble de prueba? Defina mock, stub y spy y cuándo conviene cada uno

  Un **doble de prueba** es un objeto o componente que reemplaza a uno real durante la ejecución de un test, con el objetivo de aislar la unidad bajo prueba y controlar el entorno.

  * **Stub** 
  Objeto que devuelve respuestas predefinidas. Se usa cuando queremos controlar la salida de una dependencia y evitar factores externos.

  * **Mock**
  Objeto que, además de simular comportamientos, valida que se haya llamado a métodos específicos con los argumentos esperados. Se usa para verificar interacciones entre componentes.

  * **Spy**
  Registra cómo se usó una función real (número de veces, parámetros) sin reemplazarla. Se usa cuando queremos observar el comportamiento sin alterar la implementación original.

---

### 4. ¿Por qué es útil separar app de server?

  Separar **app** de **server** permite probar la aplicación sin necesidad de levantar un servidor real, lo que acelera los tests, evita conflictos de puertos y mejora la mantenibilidad. Además, facilita reutilizar la aplicación en distintos entornos (por ejemplo, para pruebas o despliegues).

  #### Ejemplo (app, server y test):
  ```js
  // app.js
  import express from "express";

  export function makeApp() {
    const app = express();
    app.get("/ping", (req, res) => res.send("pong"));
    return app;
  }

  // server.js
  import { makeApp } from "./app.js";
  const app = makeApp();
  app.listen(3000);
  ```

  ```js
  // app.test.js
  import request from "supertest";
  import { makeApp } from "./app.js";

  test("GET /ping responde pong", async () => {
    const app = makeApp();
    const res = await request(app).get("/ping");
    expect(res.text).toBe("pong");
  });
  ```
---

### 5. Zod: diferencia entre parse y safeParse

  `parse` valida los datos y lanza una excepción si hay errores, lo que puede detener la ejecución si no se maneja correctamente.  
  En cambio, `safeParse` devuelve un objeto con `{ success, data, error }`, permitiendo manejar manualmente los fallos.

  En una ruta Express, conviene usar **`safeParse`** al recibir datos del cliente para responder con errores controlados, mientras que **`parse`** se puede usar internamente cuando se espera que los datos ya sean válidos.

---

### 6. Ejemplos de reglas de dominio que deben probarse con tests unitarios
  1. **Descuento máximo permitido:** un producto no puede tener más del 50 % de descuento, incluso si el usuario intenta aplicar más.  
  2. **Edad mínima para registrarse:** en una aplicación médica, los pacientes deben tener al menos 18 años; el sistema debe rechazar menores aunque los datos sean válidos en formato.

---

### 7. ¿Qué malos olores suele haber en suites de tests?

  Suelen haber usos excesivos de mocks, duplicaciones de código, nombres de los test poco descriptivos, no se pruba casos de error criticos, dependencias innecesarias y falta de tipado.

- Naming:

    ```
    // Sin implementar
        it("works", () => {});
        it("returns value", () => {});
        it("login test", () => {});
    ```
    

    ```
    // Implementado
        it("logs in with valid data", () => {});
        it("rejects wrong password", () => {});
        it("creates user as guest", () => {});
    ```

- Duplicación:

    ```
    // Sin implementar
        it("adds numbers", () => {
            const a = 2;
            const b = 3;
            expect(a + b).toBe(5);
        });

        it("adds other numbers", () => {
            const a = 10;
            const b = 20;
            expect(a + b).toBe(30);
        });
    ```

    ```
    // Implementado
        const add = (a: number, b: number) => a + b;

        it("adds 2 + 3", () => {
            expect(add(2, 3)).toBe(5);
        });

        it("adds 10 + 20", () => {
            expect(add(10, 20)).toBe(30);
        });
    ```
    

- Mock Frágil:

    ```
    // Sin implementar
        it("calls API once", () => {
            const api = { fetchData: jest.fn() };
            const result = api.fetchData("users"); // test depende de "users"
            expect(api.fetchData).toHaveBeenCalledWith("users");
        });
    ```

    ```
    // Implementado
        it("calls API once", () => {
            const api = { fetchData: jest.fn() };
            const param = "anyParam";
            api.fetchData(param);
            expect(api.fetchData).toHaveBeenCalled();
        });
    ```

---

### 8. ¿Cómo trazará criterios de aceptación ↔ tests? Incluya un mini ejemplo de tabla con 2 filas.

  Los criterios de aceptación de los test se trazan listando los criterios identificando los test que ya existen creando el mapa para trazarlos y revisandolos para garantizar su cobertura.

| Criterio de aceptación                           | Test asociado                        |
|-------------------------------------------------|-------------------------------------|
| Usuario puede iniciar sesión con email y contraseña válidos | `it("Inicia sesión con credenciales válidas")` |
| Mostrar error si la contraseña es incorrecta    | `it("Contraseña incorrecta")`      |


---

### 9. ¿Por qué no perseguir 100% de cobertura a toda costa?

  no es recomendable porque algunas partes del codigo como los setters y getters no aportan un valor real el testearlos, 
  ademas el testearlo TODO nos puede llegar a distraer del objetivo principal el cual es el validar el comportamiento importante, reglas de negocio etc

---

### 10. Defina y dé un ejemplo de helper/builder para tests

  Un **helper/builder**: es una funcion que ayuda a crear datos falsos de forma clara y facil de volver a usar

  #### Ejemplo:
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

---
