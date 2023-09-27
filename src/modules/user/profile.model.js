const { Schema, model } = require('mongoose')

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

const profileSchema = Schema({ 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 20
    },
    dob: {
        type: Date,
    },
    asset_details: asset_details,
    profile_photo: String,
    profession: String,
    bio: String,
    interest: [{
        type: String
    }],
    skills: [String]
}, { timestamps: true });


module.exports.Profile = model('Profile', profileSchema);