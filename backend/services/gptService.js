// services/gptService.js
import { OpenAIApi, Configuration } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que esta clave esté en tu archivo .env
});

const openai = new OpenAIApi(configuration);

export const getChatResponse = async (input) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: input }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in GPT API request:', error);
    throw new Error('Failed to generate chat response.');
  }
};
