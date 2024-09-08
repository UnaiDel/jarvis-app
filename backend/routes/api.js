// backend/routes/api.js

const express = require('express');
const router = express.Router();
const gptController = require('../controllers/gptController');

// Ruta para procesar solicitudes a GPT
router.post('/gpt', gptController.getResponse);

// Ruta de prueba para verificar el estado de la API
router.get('/status', (req, res) => {
  res.json({
    status: 'API operational',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Ruta para manejar métricas del sistema (para monitorización futura)
router.get('/metrics', (req, res) => {
  res.json({
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    uptime: process.uptime(),
  });
});

// Middleware para manejar rutas no encontradas (404)
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Middleware para manejar errores globales
router.use((error, req, res, next) => {
  console.error(`[ERROR]: ${error.message}`);
  res.status(error.status || 500).json({
    status: 'error',
    message: error.message || 'Internal Server Error',
  });
});

module.exports = router;
