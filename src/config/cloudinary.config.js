import { config, uploader } from 'cloudinary';
import { ENV_CONFIG } from './env.config';

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: ENV_CONFIG.cloudinary_cloudname,
        api_key: ENV_CONFIG.cloudinary_api_key,
        api_secret: ENV_CONFIG.cloudinary_api_secret,
    });
    next();
}

export { cloudinaryConfig, uploader };