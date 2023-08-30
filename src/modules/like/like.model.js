const { Schema, model } = require('mongoose');

const like_details = Schema({
    likedBy: String,
    likedImage: String,
    likedImageDesc: String,
    likedImageUrl: String
},{ _id : false })

module.exports.Like = model('Like', Schema({
    user_id: Schema.Types.ObjectId,
    image_id: Schema.Types.ObjectId,
    like_details: like_details,
}, {timestamps: true }) )
