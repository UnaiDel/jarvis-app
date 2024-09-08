// backend/services/gptServices.js

const axios = require('axios');

const API_KEY = process.env.OPENAI_API_KEY;

const getGPTResponse = async (prompt) => {
  console.log(prompt);
  console.log('miapi', API_KEY);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Eres un asistente útil.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Mostrar en consola para debug
    console.log('Respuesta GPT:', response.data.choices[0].message.content);

    // Devolver el texto de la respuesta
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      `[GPT Service Error]: ${
        error.response
          ? JSON.stringify(error.response.data, null, 2)
          : error.message
      }`,
    );
    throw new Error('Error al obtener respuesta de GPT');
  }
};

module.exports = {
  getGPTResponse,
};
