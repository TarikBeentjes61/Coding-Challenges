const request = require('supertest');

describe('User API', () => {
  test('should register a new user', async () => {
    const res = await request(__TEST__.app)
      .post('/api/users/register')
      .send({ username: 'newtestuser', password: 'newtestuser', email: 'newtestemail@test.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  test('should not register with missing fields', async () => {
    const res = await request(__TEST__.app)
      .post('/api/users/register')
      .send({ username: '' });
    expect(res.statusCode).toBe(400);
  });

  test('should login with correct credentials', async () => {

  });

  test('should not login with incorrect credentials', async () => {

  });

  test('should get user by id', async () => {

  });

  test('should get user by username', async () => {

  });
});