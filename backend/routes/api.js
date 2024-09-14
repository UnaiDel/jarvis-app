import express from 'express';
import { generateChatResponse } from '../controllers/gptController.js';
import { captureScreenshot } from '../controllers/puppeteerController.js';

const router = express.Router();

// GPT route
router.post('/gpt/chat', generateChatResponse);

// Puppeteer route
router.post('/screenshot', captureScreenshot);

export default router;
