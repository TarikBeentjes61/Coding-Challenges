const multer = require('multer');
const path = require('path');
const fs = require('fs');
const usersDir = path.join(__dirname, '../../uploads/users/');
const bannerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `${usersDir}/${req.user.id}/`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {recursive: true});
    } 
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, 'banner'+'.png');
  }
});
const bannerUpload = multer({
  storage: bannerStorage,
  limits: {
    fileSize: 1024 * 1024 
  },
  
  fileFilter: (req, file, cb) => {
    const filetypes = /jpe?g|png|webp|bmp|tiff/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      let error = Error('Only image files are allowed (jpeg, jpg, png, webp, bmp, tiff)');
      error.status = 400;
      cb(error);
    }
  }
});

module.exports = bannerUpload;

