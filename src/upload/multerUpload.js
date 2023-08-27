const multer = require('multer');
const Datauri = require('datauri')
const path = require('path')

// using memortyStorage, since assets will not be stored in server store
// image(photograph) upload settings
const imageStorage = multer.memoryStorage();
const singleImageUpload = multer({ imageStorage }).single('image');


// req contains field object. This func converts the buffer to data url
const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer) 

export { singleImageUpload, dataUri };