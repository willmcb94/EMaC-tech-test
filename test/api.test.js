const supertest = require('supertest');
const server = require('../server');

const request = supertest(server);

test('/api', async () => {
  const { body } = await request.get('/api').expect(200);
  expect(body.message).toBe('ok');
});
