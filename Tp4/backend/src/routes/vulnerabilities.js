const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const vulnerabilityController = require('../controllers/vulnerabilityController');
const { uploadMiddleware, uploadFile } = require('../controllers/uploadController');

// CONFIGURACIÓN CSRF POR SESSION
const csrfProtection = csrf({ cookie: false });

// Command Injection
router.post('/ping', vulnerabilityController.ping);

// CSRF - Transferencia (PROTEGIDO)
function validateOrigin(req, res, next) {
  const origin = req.get('origin') || req.get('referer');

  if (!origin) return next();

  if (!origin.includes('localhost')) {
    return res.status(403).json({ error: 'Invalid Origin' });
  }

  next();
}

router.post(
  '/transfer',
  validateOrigin,
  csrfProtection,
  vulnerabilityController.transfer
);

// Endpoint para obtener token CSRF
router.get('/csrf-token', csrfProtection, (req, res) => {
  res.setHeader(
    'Set-Cookie',
    'csrfToken=dummy; Path=/; HttpOnly; SameSite=Strict'
  );
  res.json({ csrfToken: req.csrfToken() });
});

// Local File Inclusion
router.get('/file', vulnerabilityController.readFile);

// File Upload
router.post('/upload', uploadMiddleware, uploadFile);

// Manejo de errores CSRF
router.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'CSRF token inválido' });
  }
  next(err);
});

module.exports = router;
