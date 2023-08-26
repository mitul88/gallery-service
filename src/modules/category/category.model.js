const { Schema, model } = require('mongoose');

module.exports.Category = model('Category', Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {timestamps: true }) )
