const rateLimit = require('express-rate-limit');

//Almacenamiento en memoria para intentos fallidos
const failedAttempts = new Map();
const MAX_ATTEMPTS_BEFORE_CAPTCHA = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const RATE_LIMIT_MAX_REQUESTS = 5;

//Limpiar intentos fallidos antiguos cada 30 minutos
let cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, data] of failedAttempts.entries()) {
    if (now - data.firstAttempt > RATE_LIMIT_WINDOW_MS) {
      failedAttempts.delete(key);
    }
  }
}, 30 * 60 * 1000);

//Permitir que el proceso se cierre aunque el interval esté activo
if (cleanupInterval.unref) {
  cleanupInterval.unref();
}

//Función personalizada para obtener la clave (IP + username)
const keyGenerator = (req, res) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const username = req.body?.username || 'unknown';
  return `${ip}:${username}`;
};

//Rate limiter con express-rate-limit
const loginLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: 'Demasiados intentos de login. Intenta más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: keyGenerator,
  skip: (req) => {
    return false;
  },
  handler: (req, res) => {
    res.status(429).json({ 
      error: 'Demasiados intentos de login. Intenta más tarde.',
      retryAfter: req.rateLimit.resetTime
    });
  }
});

//Middlewaredelay progresivo y requerir CAPTCHA
const captchaCheckMiddleware = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const username = req.body.username || '';
  const key = `${ip}:${username}`;
  
  let attempts = failedAttempts.get(key);
  
  // Si no hay intentos previos, inicializar
  if (!attempts) {
    attempts = {
      count: 0,
      firstAttempt: Date.now(),
      requiresCaptcha: false,
      lastAttempt: Date.now()
    };
  }
  

  const delayMs = Math.max(0, attempts.count * 1000);
  
  if (delayMs > 0) {
    //setTimeout para no bloquear el event loop
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  

  if (attempts.requiresCaptcha && !req.body.captchaToken) {
    return res.status(400).json({ 
      error: 'Se requiere verificación de captcha después de varios intentos fallidos',
      requiresCaptcha: true 
    });
  }
  
  req.attemptKey = key;
  req.attempts = attempts;
  next();
};

//Función para registrar un intento fallido
const recordFailedAttempt = (attemptKey) => {
  const now = Date.now();
  const attempts = failedAttempts.get(attemptKey) || {
    count: 0,
    firstAttempt: now,
    requiresCaptcha: false,
    lastAttempt: now
  };
  
  attempts.count++;
  attempts.lastAttempt = now;
  
  //CAPTCHA si supera el maximo de intentos permitidos
  if (attempts.count >= MAX_ATTEMPTS_BEFORE_CAPTCHA) {
    attempts.requiresCaptcha = true;
  }
  
  failedAttempts.set(attemptKey, attempts);
};

//Limpiar intentos después de login exitoso
const clearAttempts = (attemptKey) => {
  failedAttempts.delete(attemptKey);
};

module.exports = {
  loginLimiter,
  captchaCheckMiddleware,
  recordFailedAttempt,
  clearAttempts,
  failedAttempts,
  MAX_ATTEMPTS_BEFORE_CAPTCHA
};
