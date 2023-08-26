const { Schema, model } = require('mongoose');

module.exports.Image = model('Image', Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    url: {
        type: String,
    },
    uploaded_by:  Schema.Types.ObjectId,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {timestamps: true }) )
