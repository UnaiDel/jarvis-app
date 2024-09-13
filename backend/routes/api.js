// Ruta específica del archivo: backend/routes/api.js

const express = require('express');
const router = express.Router();

// Ruta de ejemplo
router.get('/', (req, res) => {
    res.send({ mensaje: 'Bienvenido a la API de JARVIS' });
});

// Añade más rutas según las necesidades de tu proyecto aquí

module.exports = router;
