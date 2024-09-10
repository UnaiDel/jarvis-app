const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('../routes/api');
const { processPrompt } = require('../controllers/gptController');

// Configurar una app Express para las pruebas
const app = express();
app.use(express.json());
app.use('/api', apiRoutes);

// Configurar una conexión de prueba con MongoDB en memoria
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Test para verificar la respuesta del endpoint gpt-process
describe('POST /api/gpt-process', () => {
  it('should process a prompt and return generated code', async () => {
    const res = await request(app).post('/api/gpt-process').send({
      prompt: 'Create a simple Node.js app',
      type: 'generate',
      fileName: 'nodeApp.js',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('code');
    expect(res.body).toHaveProperty('version');
  });
});
