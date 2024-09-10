const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración de Google Speech-to-Text
const client = new speech.SpeechClient();

// Configuración de almacenamiento para archivos de audio
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Función para procesar el archivo de audio y convertirlo a texto
const processAudio = async (audioFilePath) => {
  const file = fs.readFileSync(audioFilePath);
  const audioBytes = file.toString('base64');

  const request = {
    audio: {
      content: audioBytes,
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'es-ES', // Configuración del idioma (español)
    },
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  } catch (error) {
    console.error('Error processing speech:', error);
    throw new Error('Error en el reconocimiento de voz.');
  }
};

// Controlador para cargar y procesar el audio
const handleVoiceInput = async (req, res) => {
  const audioFile = req.file;
  if (!audioFile) {
    return res.status(400).send('No audio file uploaded.');
  }

  const audioFilePath = path.join(__dirname, '../uploads', audioFile.filename);
  try {
    const transcription = await processAudio(audioFilePath);
    res.json({ transcription });
  } catch (error) {
    console.error('Error processing audio file:', error);
    res
      .status(500)
      .json({ message: 'Error processing audio.', error: error.message });
  } finally {
    fs.unlinkSync(audioFilePath); // Elimina el archivo de audio independientemente del resultado.
  }
};

// Inicializar el módulo de voz
const initialize = () => {
  console.log('Voice module initialized');
};

module.exports = {
  initialize,
  upload,
  handleVoiceInput,
};
