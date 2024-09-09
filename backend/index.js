const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const File = require('./models/fileModel'); // Importamos el modelo de archivos
const app = express();
const apiRoutes = require('./routes/api');
const axios = require('axios'); // Asegúrate de importar axios

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Conexión a MongoDB
mongoose
  .connect('mongodb://mongodb:27017/jarvis-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello from Jarvis Backend!');
});

// Ruta para procesar con GPT y guardar archivo
app.post('/gpt-process', async (req, res) => {
  const { prompt, type, fileName } = req.body;
  let apiPrompt = prompt;

  if (type === 'fix') {
    apiPrompt = `Fix the following code:\n${prompt}`;
  } else if (type === 'generate') {
    apiPrompt = `Generate code for the following task:\n${prompt}`;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: apiPrompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      },
    );

    const generatedCode = response.data.choices[0].text;

    // Guardar el archivo en MongoDB
    let file = await File.findOne({ fileName });

    if (file) {
      file.version += 1;
      file.content = generatedCode;
    } else {
      file = new File({ fileName, content: generatedCode });
    }

    await file.save();
    res.json({ code: generatedCode, version: file.version });
  } catch (error) {
    console.error('Error interacting with OpenAI:', error);
    res.status(500).send('Error generating code.');
  }
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
