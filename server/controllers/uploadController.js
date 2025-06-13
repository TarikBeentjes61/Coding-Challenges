const path = require('path');
const uploadService = require('../services/uploadService');
const ApiError = require('../utils/apiError');

exports.banner = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(new ApiError("No file uploaded", 400));
        }
        const file = req.file;
        const userId = req.user.id;
        const userDir = path.join(__dirname, '../../uploads/users/', userId);
        const imagePath = path.join(userDir, 'banner.jpg');

        await uploadService.uploadImage({ path: imagePath, dir: userDir, file });

        res.status(200).json({ message: 'Banner uploaded successfully' });
    } catch (error) {
        next(new ApiError("Invalid File Type", 400));
    }
};


exports.challengeImage = async (req, res, next) => {
    try {
        const { challengeId } = req.body; //validate
        if (!challengeId || !req.file) {
            return next(new ApiError("Missing file or challengeId", 400));
        }
        const file = req.file;
        const challengeDir = path.join(__dirname, '../../uploads/challenges/', challengeId);
        const imagePath = path.join(challengeDir, `${Date.now()}.jpg`);

        await uploadService.uploadImage({ path: imagePath, dir: challengeDir, file });

        res.status(200).json({ url: `uploads/challenges/${challengeId}/${path.basename(imagePath)}` });
    } catch (error) {
        next(new ApiError("Image Upload Failed", 500));
    }
};
