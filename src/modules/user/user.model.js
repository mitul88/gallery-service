const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken');
const { ENV_CONFIG } = require('../../config/env.config');

const userSchema = Schema({ 
    name: {
        type: String
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 150
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 20
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100
    },
    type: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

userSchema.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this.id,
        email: this.email,
        phone: this.phone,
        name: this.name,
        role: this.role
    }, ENV_CONFIG.jwt_encryption_key, {expiresIn: "7d"})

    return token
}

module.exports.User = model('User', userSchema);