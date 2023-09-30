const { Schema, model } = require('mongoose');

const user = Schema({
    id: Schema.Types.ObjectId,
    name: String
},{ _id : false })

module.exports.Comment = model('Comment', Schema({
    image_id: Schema.Types.ObjectId,
    user_comment: {
        type: String,
        required: true
    },
    user: user,
    commented_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true }) )
