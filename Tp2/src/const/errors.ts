const errorsConstants = {
    'NO_ITEMS': {
        code: 422,
        message: 'No ha ingresado ningun item'
    },

    'CANCEL_DELIVERED': {
        code: 409,
        message: 'Ha intentado cancelar una orden ya entregada'
    },

    'ADDRESS_TOO_SHORT': {
        code: 401,
        message: 'La dirección es demasiado corta'
    },

    'TOO_MANY_TOPPINGS': {
        code: 402,
        message: 'Ha seleccionado demasiados toppings'
    },

    'ORDER_NOT_FOUND': {
        code: 404,
        message: 'Orden no encontrada'
    },

    'CANNOT_CANCEL': {
        code: 409,
        message: 'No se puede cancelar la orden en su estado actual'
    }
}

export default errorsConstants;