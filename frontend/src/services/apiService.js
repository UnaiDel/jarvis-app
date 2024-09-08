// frontend/src/services/apiService.js

import axios from 'axios';

const getGPTResponse = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:3001/api/gpt', {
      prompt,
    });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el prompt:', error.message);
    throw error;
  }
};

export default { getGPTResponse };
