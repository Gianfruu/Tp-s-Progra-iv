const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginLimiter, captchaCheckMiddleware } = require('../middleware/bruteForceProtection');

// Rutas de autenticación
router.post('/login', captchaCheckMiddleware, loginLimiter, authController.login);
router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', authController.checkUsername);

module.exports = router;
