const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const basePath = path.join(__dirname, '../../');

exports.deleteFile = async (filePath) => {
    const path_ = path.join(basePath, filePath);
    if (fs.existsSync(path_)) {
        fs.unlinkSync(path_);
    }
}

exports.uploadImage = async ({ path, dir, file }) => {
    createDir(dir);
    await sharp(file.buffer).jpeg().toFile(path);
};

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
