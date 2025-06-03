const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload'); 

class UserRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/profile/:username', authenticateToken, userController.getUserProfile)

        this.router.post('/login', userController.loginUser);
        this.router.post('/register', userController.registerUser);
        this.router.post('/profile/:username/banner', authenticateToken, upload.single('file'), userController.uploadBanner);
    }

    getRoutes() {
        return this.router;
    }
}
module.exports = new UserRouter().getRoutes()