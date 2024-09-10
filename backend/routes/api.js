const express = require('express');
const { processPrompt } = require('../controllers/gptController');
const { authenticate } = require('../services/firebaseAuthService');
const { searchInternet } = require('../controllers/puppeteerController');
const { upload, handleVoiceInput } = require('../voice/voiceModule');

const router = express.Router();

// Ruta para procesar prompts GPT
router.post('/gpt-process', authenticate, processPrompt);

// Ruta para procesar entradas de voz
router.post('/voice-input', upload.single('audio'), handleVoiceInput);

// Ruta para realizar búsquedas en internet
router.post('/search-internet', authenticate, searchInternet);

module.exports = router;
