// controllers/gptController.js
import { getChatResponse } from '../services/gptService.js';

export const generateChatResponse = async (req, res, next) => {
  try {
    const input = req.body.input;
    const response = await getChatResponse(input);
    res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};
