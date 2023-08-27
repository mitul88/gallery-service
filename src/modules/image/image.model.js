const { Schema, model } = require('mongoose');

const asset_details = Schema({
    asset_id: String,
    public_id: String,
    version: String,
    version_id: String,
    signature: String,
    format: String,
    created_at: String,
    tags: [String],
    url: String,
    secure_url: String,
},{ _id : false })

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
    asset_details: asset_details,
    uploaded_by:  Schema.Types.ObjectId,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {timestamps: true }) )
