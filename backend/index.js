require('dotenv').config(); // Importar dotenv para cargar las variables de entorno
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const firebaseAdmin = require('firebase-admin');
const apiRoutes = require('./routes/api');
const voiceModule = require('./voice/voiceModule');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Inicialización de Firebase Admin
const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK_BASE64;
const serviceAccount = JSON.parse(
  Buffer.from(serviceAccountBase64, 'base64').toString('utf-8'),
);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Rutas de la API
app.use('/api', apiRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello from JARVIS Backend!');
});

// Módulo de voz
voiceModule.initialize();

// Inicio del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
