const axios = require('axios');

const getGPTResponse = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      'Error interacting with OpenAI:',
      error.response.data || error.message,
    );
    throw new Error('Error generating response from GPT.');
  }
};

module.exports = {
  getGPTResponse,
};
