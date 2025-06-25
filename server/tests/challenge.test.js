const request = require('supertest');

describe('Challenge API', () => {
    test('should create a challenge', async () => {
        const challenge = {
            title: 'Test Challenge 1',
            description: {
                type: 'doc',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Solve this.' }] }]
            },
            solution: 'solution1'
        };
        const res = await request(__TEST__.app)
            .post('/api/challenges')
            .set('Authorization', `Bearer ${__TEST__.user.token}`)
            .send(challenge);
        expect(res.statusCode).toBe(201);
        expect(res.body.insertedId || res.body._id).toBeDefined();
        expect(typeof res.body.insertedId || res.body._id).toBe('string');
        __TEST__.challengeId = (res.body.insertedId || res.body._id)?.toString();
        console.log('Saved challenge ID:', __TEST__.challengeId);
    });

    test('should not create a challenge with duplicate title', async () => {
        const challenge = {
            title: 'Test Challenge 1',
            description: {
                type: 'doc',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Duplicate.' }] }]
            },
            solution: 'solution2'
        };
        const res = await request(__TEST__.app)
            .post('/api/challenges')
            .set('Authorization', `Bearer ${__TEST__.user.token}`)
            .send(challenge);
        expect(res.statusCode).toBe(409);
        expect(res.body.message).toMatch(/Title already exists/);
    });

    test('should get challenges', async () => {
        const res = await request(__TEST__.app)
            .get('/api/challenges?page=1&limit=25')
            .set('Authorization', `Bearer ${__TEST__.user.token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    test('should get challenge by id', async () => {
        const res = await request(__TEST__.app)
            .get(`/api/challenges/${__TEST__.challengeId}`)
            .set('Authorization', `Bearer ${__TEST__.user.token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBeDefined();
        expect(res.body.title).toBe('Test Challenge 1');
    });

    test('get challenge by id throws error on invalid id', async () => {
        const res = await request(__TEST__.app)
            .get(`/api/challenges/invalidId`)
            .set('Authorization', `Bearer ${__TEST__.user.token}`);
        expect(res.statusCode).toBe(404);
    });

    test('should get created challenges by username', async () => {
        const res = await request(__TEST__.app)
            .get(`/api/challenges/created/${__TEST__.user.username}`)
            .set('Authorization', `Bearer ${__TEST__.user.token}`);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    test('solve challenge throws error on incorrect solution', async () => {
        const solve = {
            challengeId: __TEST__.challengeId,
            solution: 'incorrect solution1'
        };
        const res = await request(__TEST__.app)
            .post('/api/challenges/solve')
            .set('Authorization', `Bearer ${__TEST__.user2.token}`)
            .send(solve);
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/Incorrect solution/i);
    });

    test('should solve a challenge', async () => {
        const solve = {
            challengeId: __TEST__.challengeId,
            solution: 'solution1'
        };
        const res = await request(__TEST__.app)
            .post('/api/challenges/solve')
            .set('Authorization', `Bearer ${__TEST__.user2.token}`)
            .send(solve);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Challenge solved successfully/i);
    });

    test('solve challenge throws error if already solved', async () => {
        const solve = {
            challengeId: __TEST__.challengeId,
            solution: 'solution1'
        };
        const res = await request(__TEST__.app)
            .post('/api/challenges/solve')
            .set('Authorization', `Bearer ${__TEST__.user2.token}`)
            .send(solve);
        expect(res.statusCode).toBe(409);
        expect(res.body.message).toMatch(/Challenge already solved/i);
    });

    test('should get solved challenges by username', async () => {
        const res = await request(__TEST__.app)
            .get(`/api/challenges/solved/${__TEST__.user2.username}`)
            .set('Authorization', `Bearer ${__TEST__.user.token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    test('should not solve own challenge', async () => {
        const solve = {
            challengeId: __TEST__.challengeId,
            solution: 'solution1'
        };
        const res = await request(__TEST__.app)
            .post('/api/challenges/solve')
            .set('Authorization', `Bearer ${__TEST__.user.token}`)
            .send(solve);
        expect(res.statusCode).toBe(403);
        expect(res.body.message).toMatch(/You cannot solve your own challenge/i);
    });

    test('should return 404 for non-existent challenge', async () => {
        const fakeId = '000000000000000000000000';
        const res = await request(__TEST__.app)
            .get(`/api/challenges/${fakeId}`)
            .set('Authorization', `Bearer ${__TEST__.user.token}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toMatch(/Challenge not found/i);
    });

    test('should update a challenge', async () => {
        const update = {
            challengeId: __TEST__.challengeId,
            title: 'Test Challenge 1 Updated',
            description: {
                type: 'doc',
                content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Updated.' }] }]
            },
            solution: 'solution1'
        };
        const res = await request(__TEST__.app)
            .put('/api/challenges')
            .set('Authorization', `Bearer ${__TEST__.user.token}`)
            .send(update);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Challenge updated successfully/i);
    });

});