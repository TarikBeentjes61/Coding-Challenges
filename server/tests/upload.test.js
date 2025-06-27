const fs = require('fs');
const path = require('path');
const request = require('supertest');

describe('Upload API', () => {
  test('should upload banner', async () => {
    const filePath = path.join(__dirname, 'testFiles/banner.jpg');
    expect(fs.existsSync(filePath)).toBe(true);
    const res = await request(__TEST__.app)
      .post('/api/uploads/banner')
      .set('Authorization', `Bearer ${__TEST__.user.token}`)
      .attach('file', filePath);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Banner uploaded successfully');
  });

  test('should not upload banner without file', async () => {
    const res = await request(__TEST__.app)
      .post('/api/uploads/banner')
      .set('Authorization', `Bearer ${__TEST__.user.token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('No file uploaded');
  });

  test('should upload challenge image', async () => {
    const filePath = path.join(__dirname, 'testFiles/challenge.jpg');
    expect(fs.existsSync(filePath)).toBe(true);
    const res = await request(__TEST__.app)
      .post('/api/uploads/challengeImage')
      .set('Authorization', `Bearer ${__TEST__.user.token}`)
      .field('challengeId', __TEST__.challengeId)
      .attach('file', filePath);
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toMatch(/uploads\/challenges\/\w+\/\d+\.jpg/);
  });

  test('should not upload challenge image without challengeId', async () => {
    const filePath = path.join(__dirname, 'testFiles/challenge.jpg');
    expect(fs.existsSync(filePath)).toBe(true);
    const res = await request(__TEST__.app)
      .post('/api/uploads/challengeImage')
      .set('Authorization', `Bearer ${__TEST__.user.token}`)
      .attach('file', filePath);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing file or challengeId');
  });

  test('should not upload challenge image without file', async () => {
    const res = await request(__TEST__.app)
      .post('/api/uploads/challengeImage')
      .set('Authorization', `Bearer ${__TEST__.user.token}`)
      .field('challengeId', __TEST__.challengeId);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Missing file or challengeId');
  });

});
