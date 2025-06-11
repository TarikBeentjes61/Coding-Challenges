const path = require('path');
const uploadService = require('../services/uploadService');

exports.banner = async (req, res, next) => {
    try {
        if (!req.file) throw new Error("No file uploaded");
        const file = req.file;
        const userId = req.user.id;
        const userDir = path.join(__dirname, '../../uploads/users/', userId);
        const imagePath = path.join(userDir, 'banner.jpg');

        uploadService.uploadImage({ path: imagePath, dir: userDir, file: file })

        res.json({ message: 'Banner uploaded successfully' });
    } catch (error) {
        next(Error("Invalid File Type"));
    }
};

exports.challengeImage = async (req, res, next) => {
    try {
        const { challengeId } = req.body;
        if (!challengeId || !req.file) throw new Error("Missing file or challengeId");
        const file = req.file;
        const challengeDir = path.join(__dirname, '../../uploads/challenges/', challengeId);
        const imagePath = path.join(challengeDir, `${Date.now()}.jpg`);

        uploadService.uploadImage({ path: imagePath, dir: challengeDir, file: file })

        res.json({ url: `uploads/challenges/${challengeId}/${path.basename(imagePath)}` });
    } catch (error) {
        next(Error("Invalid File Type"));
    }
};
