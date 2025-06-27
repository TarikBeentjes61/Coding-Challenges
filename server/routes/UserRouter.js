const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/:username', authenticateToken, userController.getUserProfile);

        this.router.post('/login', userController.loginUser);
        this.router.post('/register', userController.registerUser);
    }
    
    getRoutes() {
        return this.router;
    }
}
module.exports = new UserRouter().getRoutes()