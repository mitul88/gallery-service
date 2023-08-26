const multer = require('multer');

module.exports.storage = multer.memoryStorage();

// const multerUploads = multer({ storage }).single(‘image’);
// export { multerUploads };