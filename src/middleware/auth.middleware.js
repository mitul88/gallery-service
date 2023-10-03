const jwt = require('jsonwebtoken');
const { ENV_CONFIG } = require('../config/env.config');


module.exports.auth = {
    authCheck: async (req, res, next) => {
        let token = req.header('authorization');
        
        if(!token || token === null) return res.status(401).send("Access denied, No token provided");
        else token = token.split(" ")[1].trim();

        let decoded;
        if (token != null) decoded = await jwt.verify(token, ENV_CONFIG.jwt_encryption_key);
        else return res.status(401).send("Access denied, No token provided");

        if(!decoded) return res.status(400).send("Invalid token !!");

        req.user = decoded;
        next();
    }
}