import axios from 'axios';

// Función para enviar el input a GPT
export const sendGptInput = async (inputText) => {
  try {
    const response = await axios.post('http://localhost:3001/api/gpt/chat', {
      input: inputText,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending GPT input:', error);
    throw new Error('Failed to get GPT response.');
  }
};
