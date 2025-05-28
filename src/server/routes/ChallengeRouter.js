const express = require('express');
const challengeController = require('../controllers/challengeController');
const authenticateToken = require('../middleware/auth');

class ChallengeRouter {
    constructor() {
      this.router = express.Router();
      this.registerRoutes();
    }

    registerRoutes() {
      this.router.get('/', authenticateToken, challengeController.getChallenges);
      this.router.get('/:challengeId', authenticateToken, challengeController.getChallengeById);
      this.router.get('/solved/:username', authenticateToken, challengeController.getSolvedChallengesByUserName);
      this.router.get('/created/:username', authenticateToken, challengeController.getCreatedChallengesByUserName);

      this.router.post('/', authenticateToken, challengeController.createChallenge);
      this.router.post('/solve', authenticateToken, challengeController.solveChallenge);
    }

    getRoutes() {
      return this.router;
    }
}

module.exports = new ChallengeRouter().getRoutes();
