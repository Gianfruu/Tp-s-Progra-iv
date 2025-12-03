// Este middleware detecta patrones comunes de inyección SQL en las solicitudes entrantes.
/* Debe contrarrestar intentos de: 
    -Comentarios
    -Palabras clave SQL
    -Uniones
    -Exposicion de tablas de la base de datos
*/

const sqlInjectionMiddleware = (req, res, next) => {

    const patronesRegex = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND|FROM)\b)/i, // Palabras clave SQL
        /(--|;|\/\*|\*\/|#)/, // Comentarios y terminadores de línea
        /(['"]\s*(=|LIKE)\s*['"])/, // Comparaciones sospechosas
        /(\b(1=1|1=0)\b)/, // Condiciones siempre verdaderas/falsas
        /(\bINFORMATION_SCHEMA\b)/i // Exposición de tablas de la base de datos
    ];

    // Función para detectar patrones de inyección SQL 
    const detectarInjection = (value) => {
        if (typeof value === 'string') {
            for (const pattern of patronesRegex) {
                if (pattern.test(value)) {
                    return true;
                }
            }
        }
        return false;
    };

    // Verificar en query
    for (const key in req.query) {
        if (detectarInjection(req.query[key])) {
            return res.status(200).json([]);
        }
    }

    // Verificar en body
    for (const key in req.body) {
        if (detectarInjection(req.body[key])) {
            return res.status(200).json([]);
        }
    }

    // Verificar en params
    for (const key in req.params) {
        if (detectarInjection(req.params[key])) {
            return res.status(200).json([]);
        }
    }

    next();
};

module.exports = sqlInjectionMiddleware;