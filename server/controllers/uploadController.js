const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

exports.banner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userDir = path.join(__dirname, '../../uploads/users/', userId);
        const bannerPath = path.join(userDir, 'banner.jpg');

        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        await sharp(req.body).jpeg().toFile(bannerPath);
        res.json({ message: 'Banner uploaded successfully' });
    } catch (error) {
        next(Error("Invalid File Type"));
    }
};