import axios from 'axios';

const sendPrompt = async (prompt) => {
  try {
    const response = await axios.post('http://localhost:3001/gpt-process', {
      prompt,
    });
    return response.data.code;
  } catch (error) {
    console.error('Error sending prompt to backend:', error);
    return 'Error: Could not get response';
  }
};

export default { sendPrompt };
