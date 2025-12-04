const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const injectionMiddleware = require('../middlewares/sqlInjectionMiddleware');

// Ruta de productos protegida de inyección SQL
router.get('/products', injectionMiddleware, productController.getProducts);

module.exports = router;
