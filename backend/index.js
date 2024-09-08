// backend/index.js

const express = require('express');
const cors = require('cors'); // Importar CORS
const app = express();
const gptRoutes = require('./routes/api');

// Middleware para manejar JSON
app.use(express.json());

// Configurar CORS
app.use(cors({ origin: 'http://localhost:3000' })); // Permitir solicitudes del frontend

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello from GPT Backend!');
});

// Usar las rutas API
app.use('/api', gptRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
