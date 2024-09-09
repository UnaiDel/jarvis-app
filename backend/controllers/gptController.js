const puppeteer = require('puppeteer');
const axios = require('axios'); // <-- Asegúrate de incluir esto

const gptProcess = async (req, res) => {
  const { prompt, type } = req.body;
  let apiPrompt = prompt;

  if (type === 'fix') {
    apiPrompt = `Fix the following code:\n${prompt}`;
  } else if (type === 'generate') {
    apiPrompt = `Generate code for the following task:\n${prompt}`;
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      { prompt: apiPrompt, max_tokens: 150 },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } },
    );

    res.json({ code: response.data.choices[0].text });
  } catch (error) {
    console.error(
      'Error processing GPT request:',
      error.response ? error.response.data : error.message,
    );
    res.status(500).send('Error generating code');
  }
};

module.exports = { gptProcess };
