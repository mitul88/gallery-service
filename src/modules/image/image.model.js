const { Schema, model } = require('mongoose');
const pagination = require('mongoose-paginate-v2');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

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

const imageSchema =  Schema({
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
    slug: {
        type: String,
    },
    asset_details: asset_details,
    uploaded_by:  {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {timestamps: true }); 

imageSchema.plugin(pagination);
imageSchema.plugin(aggregatePaginate);

module.exports.Image = model('Image', imageSchema);