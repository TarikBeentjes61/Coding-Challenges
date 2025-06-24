const { getDB, disconnectFromDB } = require('../config/db');
const { clearLimiterInterval } = require('../middleware/limiter');
const jwt = require('jsonwebtoken');
const app = require('../config/app');

let token;
let userId;
let challengeId;
let db;

beforeAll(async () => {
	jest.mock('sharp', () => {
	const sharpMock = () => ({
		resize: jest.fn().mockReturnThis(),
		toBuffer: jest.fn().mockResolvedValue(Buffer.from('')),
		toFile: jest.fn().mockResolvedValue({}),
	});
	sharpMock.cache = jest.fn();
	return sharpMock;
	});

  db = await getDB();
  await db.collection('challenges').deleteMany({ title: /test challenge/i });
  await db.collection('users').deleteMany({ username: /testuser/i });
  await db.collection('solvedChallenges').deleteMany({});
  // Create test user
  const user = {
    username: 'testuser1',
    password: 'testpass1',
    email: 'testuser1@example.com',
    registerDate: '2024-01-01',
    lastLoggedIn: '2024-01-01',
    bio: '',
    profilePicture: '',
    reputation: 0
  };

  await db.collection('users').deleteMany({ username: user.username });
  const result = await db.collection('users').insertOne(user);
  userId = result.insertedId.toString();
  token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret key', { expiresIn: '1d' });
});

afterAll(async () => {
  db = await getDB();
  await db.collection('challenges').deleteMany({ title: /test challenge/i });
  await db.collection('users').deleteMany({ username: /testuser/i });
  await db.collection('solvedChallenges').deleteMany({});
  await disconnectFromDB();
  clearLimiterInterval();
});

global.__TEST__ = {
  get token() {
    return token;
  },
  get userId() {
    return userId;
  },
  get challengeId() {
    return challengeId;
  },
  set challengeId(id) {
    challengeId = id;
  },
  get db() {
    return db;
  },
  get app() {
    return app;
  }
};
