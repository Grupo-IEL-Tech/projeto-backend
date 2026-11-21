const request = require('supertest');
const app = require('../src/app');

describe('Health check', () => {
  it('responde que a API está online', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
