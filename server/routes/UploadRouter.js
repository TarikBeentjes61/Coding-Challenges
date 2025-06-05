const express = require('express');
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/auth');

class UploadRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/banner',
            authenticateToken,
            express.raw({ type: 'image/*', limit: '1mb' }),
            uploadController.banner
        );
    }
    
    getRoutes() {
        return this.router;
    }
}
module.exports = new UploadRouter().getRoutes()