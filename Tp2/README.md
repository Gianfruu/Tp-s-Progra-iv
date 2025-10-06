# Trabajo Práctico 2
## Ejercicio 4

### Inciso 7
> ¿Qué malos olores suele haber en suites de tests? Dé tres ejemplos de naming, duplicación, asserts débiles. mocks fragiles, etc.

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

### Inciso 8

> ¿Cómo trazará criterios de aceptación <-> tests? Incluya un mini ejemplo de tabla con dos filas.

Los criterios de aceptación de los test se trazan listando los criterios identificando los test que ya existen creando el mapa para trazarlos y revisandolos para garantizar su cobertura.

| Criterio de aceptación                           | Test asociado                        |
|-------------------------------------------------|-------------------------------------|
| Usuario puede iniciar sesión con email y contraseña válidos | `it("Inicia sesión con credenciales válidas")` |
| Mostrar error si la contraseña es incorrecta    | `it("Contraseña incorrecta")`      |
