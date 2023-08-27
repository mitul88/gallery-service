const { config } = require('cloudinary');
const { ENV_CONFIG } = require('./env.config');

module.exports.cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: ENV_CONFIG.cloudinary_cloudname,
        api_key: ENV_CONFIG.cloudinary_api_key,
        api_secret: ENV_CONFIG.cloudinary_api_secret,
    });
    next();
}

module.exports.uploader