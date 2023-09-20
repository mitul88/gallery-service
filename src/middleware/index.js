const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { ENV_CONFIG } = require('../config/env.config');
const { cloudinaryConfig } = require('../config/cloudinary.config');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: 'http://localhost:3000'
    }));
    app.use(express.static('public'))
    app.use('*', cloudinaryConfig)
    
    if (ENV_CONFIG.node_env === 'development') {
        app.use(morgan('dev'));
    }
}