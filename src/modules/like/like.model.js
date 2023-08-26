const { Schema, model } = require('mongoose');

const details = Schema({
    imageName: String,
    imageDesc: String,
    imageUrl: String
},{ _id : false })

module.exports.Like = model('Like', Schema({
    userId: Schema.Types.ObjectId,
    imageId: Schema.Types.ObjectId,
    details: {details},
}, {timestamps: true }) )
