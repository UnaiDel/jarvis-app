const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');  // Importa el middleware de autenticación

// Ruta pública (sin autenticación)
router.get('/', (req, res) => {
    res.send({ mensaje: 'Bienvenido a la API de JARVIS' });
});

// Ruta protegida (requiere autenticación)
router.get('/protegido', verifyToken, (req, res) => {
    res.send({ mensaje: `Hola, ${req.user.name}. Tienes acceso a esta ruta protegida.` });
});

module.exports = router;
