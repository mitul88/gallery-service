const { Schema, model } = require('mongoose');

const user = Schema({
    id: Schema.Types.ObjectId,
    name: String
},{ _id : false })

module.exports.Comment = model('Comment', Schema({
    comment: {
        type: String,
        required: true
    },
    user: {user},
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: true
    },
}, {timestamps: true }) )
