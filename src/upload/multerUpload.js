const multer = require('multer');

module.exports.imageStorage = multer.memoryStorage();

// const multerUploads = multer({ imageStorage }).single(‘image’);
// export { multerUploads };