import request from 'supertest';
import app from '../index.js';

describe('POST /api/gpt/chat', () => {
  it('should return a valid GPT response', async () => {
    const response = await request(app)
      .post('/api/gpt/chat')
      .send({ input: 'Hello' });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });
});
