const { getDB, disconnectFromDB } = require('../config/db');
const { clearLimiterInterval } = require('../middleware/limiter');
const { convertToObjectId } = require('../utils/utils');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const statePath = path.resolve(__dirname, './__test_state.json');

  let shared = {};
  if (fs.existsSync(statePath)) {
    shared = JSON.parse(fs.readFileSync(statePath, 'utf-8'));
  }

  const db = await getDB();

  await db.collection('solvedChallenges').deleteMany({ userId: convertToObjectId(shared.user2._id) });
  await db.collection('challenges').deleteMany({ title: /test challenge/i });
  await db.collection('users').deleteMany({ username: /testuser/i });

  if (shared.challengeId) {
    await db.collection('solvedChallenges').deleteMany({
      challengeId: convertToObjectId(shared.challengeId)
    });
  }

  await disconnectFromDB();
  clearLimiterInterval();

  if (fs.existsSync(statePath)) {
    fs.unlinkSync(statePath);
  }
  if (fs.existsSync(path.join(__dirname, `../../uploads/users/${shared.user._id}`))) {
    fs.rmSync(path.join(__dirname, `../../uploads/users/${shared.user._id}`), { recursive: true, force: true });
  }
  if (fs.existsSync(path.join(__dirname, `../../uploads/challenges/${shared.challengeId}`))) {
    fs.rmSync(path.join(__dirname, `../../uploads/challenges/${shared.challengeId}`), { recursive: true, force: true });
  }
};
