const { getDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const db = await getDB();
  const user = {
    username: 'testuser1',
    password: 'testpass1',
    email: 'testuser1@example.com',
  };
  const user2 = {
    username: 'testuser2',
    password: 'testpass2',
    email: 'testuser2@example.com',
  };

  await db.collection('users').deleteMany({ username: /testuser/i });
  const result = await db.collection('users').insertOne(user);
  const result2 = await db.collection('users').insertOne(user2);
  user.token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET || 'secret key', { expiresIn: '1d' });
  user2.token = jwt.sign({ id: result2.insertedId }, process.env.JWT_SECRET || 'secret key', { expiresIn: '1d' });

  const sharedState = {
      user,
      user2,
      challengeId: '',
  };

  fs.writeFileSync(
    path.resolve(__dirname, './__test_state.json'),
    JSON.stringify(sharedState)
  );
}

