const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { ENV_CONFIG } = require('../config/env.config');

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static('public'))
    
    if (ENV_CONFIG.node_env === 'development') {
        app.use(morgan('dev'));
    }
}