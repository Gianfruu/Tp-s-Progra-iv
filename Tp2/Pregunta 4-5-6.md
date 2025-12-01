1. ¿Por qué es útil separar app de server?
   
    Separar app de server permite probar la aplicación sin necesidad de levantar un servidor real, lo que acelera los tests, evita conflictos de puertos y mejora la mantenibilidad. Además, facilita reutilizar la aplicación en distintos entornos (por ejemplo, para pruebas o despliegues).

    Ejemplo (app, server y test):
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

5. Zod: diferencia entre parse y safeParse
   
    parse valida los datos y lanza una excepción si hay errores, lo que puede detener la ejecución si no se maneja correctamente.  
    En cambio, safeParse devuelve un objeto con { success, data, error }, permitiendo manejar manualmente los fallos. 
    En una ruta Express, conviene usar safeParse al recibir datos del cliente para responder con errores controlados, mientras que parse se puede usar internamente cuando se espera que los datos ya sean válidos.

6. Ejemplos de reglas de dominio que deben probarse con tests unitarios
   1. Descuento máximo permitido: un producto no puede tener más del 50 % de descuento, incluso si el usuario intenta aplicar más.  
   2. Edad mínima para registrarse: en una aplicación médica, los pacientes deben tener al menos 18 años; el sistema debe rechazar menores aunque los datos sean válidos en formato.
