const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const authenticateToken = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

class UploadRouter {
    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.post(
            '/banner',
            authenticateToken,
            upload.single('file'),
            uploadController.banner
        );

        this.router.post(
            '/challengeImage',
            authenticateToken,
            upload.single('file'),
            uploadController.challengeImage
        );
    }

    getRoutes() {
        return this.router;
    }
}

module.exports = new UploadRouter().getRoutes();
