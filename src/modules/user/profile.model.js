const { Schema, model } = require('mongoose')

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
    profile_photo: String,
    profession: String,
    bio: String,
    interest: [{
        type: String
    }],
    skills: [String]
}, { timestamps: true });


module.exports.Profile = model('Profile', profileSchema);