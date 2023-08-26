require('dotenv/config');

module.exports.ENV_CONFIG = {
    port : process.env.PORT,
    node_env : process.env.NODE_ENV,
    mongodb_url : process.env.MONGODB_URL,
    db_name : process.env.DB_NAME,
    jwt_encryption_key : process.env.JWT_ENCRYPTION_KEY,
    cloudinary_api_secret : process.env.CLOUDINARY_API_SECRET,
    cloudinary_api_key : process.env.CLOUDINARY_API_KEY,
    cloudinary_url : process.env.CLOUDINARY_URL,
    cloudinary_cloudname : process.env.CLOUDINARY_CLOUDNAME,
}