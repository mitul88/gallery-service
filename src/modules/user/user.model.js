const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken');
const { ENV_CONFIG } = require('../../config/env.config');

const user = Schema({ 
    name: {
        type: String
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 150
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
        type: String,
        enum: ['active', 'deactive', 'suspended'],
        default: "active"
    }
}, { timestamps: true });

user.methods.generateJWT = function() {
    const token = jwt.sign({
        _id: this.id,
        email: this.email,
        name: this.name,
        role: this.role,
        status: this.status
    }, ENV_CONFIG.jwt_encryption_key, {expiresIn: "7d"})

    return token
}

module.exports.User = model('User', user);