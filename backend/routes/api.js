const express = require('express');
const {
  gptProcess,
  webSearchWithPuppeteer,
} = require('../controllers/gptController');
const router = express.Router();

router.post('/gpt-process', gptProcess);

module.exports = router;
