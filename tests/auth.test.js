const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@test.com',
      password: '123456',
    });
    expect(res.statusCode).toEqual(200);
  });
});
