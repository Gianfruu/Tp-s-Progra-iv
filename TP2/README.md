# Trabajo Práctico N°2
## Ejercicio 4 

### Inciso 1:

> Explique el ciclo **```Rojo → Verde → Refactor```** y por qué es importante el tamaño de los pasos. 

El **Ciclo TDD** se basa en tres pasos: 
***Rojo***: Escribir un test que falla, porque la funcionalidad aún no existe.
***Verde***: Implementar la mínima lógica necesaria para que ese test pase.
***Refactor***: Mejorar el código manteniendo todos los tests en verde.
Es importante que los pasos sean pequeños, porque así los errores se detectan rápido y se reduce la complejidad al avanzar de forma incremental y segura.

---
### Inciso 2:

> Diferencie **```tests unitarios de integración```** y **```E2E en APIs```**. 

* **Unitarios**
Prueban funciones o clases aisladas, sin dependencias externas. Esto se consigue “mockeando” o “stubbeando” las dependencias. Son rápidos y fáciles de correr.

* **Integración**
Comprueban cómo interactúan varias partes del sistema. En APIs, significa montar rutas de Express y verificar peticiones/respuestas usando Supertest, sin necesidad de levantar un servidor real.

* **End-to-End (E2E)**
Simulan el flujo completo, desde el cliente hasta la base de datos real y el servidor en ejecución. Son más lentos pero garantizan que todo el sistema funciona como un todo. Se pueden usar herramientas como Cypress, Playwright o Postman/Newman.

---
### Inciso 3:

> ¿Qué es un **```doble de prueba```**? Defina **```mock, stub y spy```** y cuándo conviene cada uno.

Un **doble de prueba** es un objeto o componente que reemplaza a uno real durante la ejecución de un test, con el objetivo de aislar la unidad bajo prueba y controlar el entorno.

* **Stub** 
Objeto que devuelve respuestas predefinidas. Se usa cuando queremos controlar la salida de una dependencia y evitar factores externos.

* **Mock**
Objeto que, además de simular comportamientos, valida que se haya llamado a métodos específicos con los argumentos esperados. Se usa para verificar interacciones entre componentes.

* **Spy**
Registra cómo se usó una función real (número de veces, parámetros) sin reemplazarla. Se usa cuando queremos observar el comportamiento sin alterar la implementación original.