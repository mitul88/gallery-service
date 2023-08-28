const { Schema, model } = require('mongoose');

const like_details = Schema({
    likedBy: String,
    likedImage: String,
    likedImageDesc: String,
    likedImageUrl: String
},{ _id : false })

module.exports.Like = model('Like', Schema({
    userId: Schema.Types.ObjectId,
    imageId: Schema.Types.ObjectId,
    like_details: like_details,
}, {timestamps: true }) )
