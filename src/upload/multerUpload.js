const multer = require('multer');
const DatauriParser = require('datauri/parser')
const path = require('path')

// using memortyStorage, since assets will not be stored in server store
// image(photograph) upload settings
const imageStorage = multer.memoryStorage();
module.exports.singleImageUpload = multer({ imageStorage }).single('image');

// profile photo upload settings
const profilePhotoStorage = multer.memoryStorage();
module.exports.singleProfilePhotoUpload = multer({ profilePhotoStorage }).single('profile-photo');

// req contains field object. This func converts the buffer to data url
const dUri = new DatauriParser();
module.exports.dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer); 
