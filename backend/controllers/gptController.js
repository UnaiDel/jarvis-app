// backend/controllers/gptController.js

const gptService = require('../services/gptServices');

// Controlador para obtener respuesta de GPT
exports.getResponse = async (req, res) => {
  const { prompt } = req.body;
  try {
    // Utilizamos el servicio para obtener la respuesta de GPT
    const response = await gptService.getGPTResponse(prompt);

    res.status(200).json({ message: response });
  } catch (error) {
    console.error(`[GPT Error]: ${error.message}`);
    res.status(500).json({ error: 'Error al obtener respuesta de GPT' });
  }
};
