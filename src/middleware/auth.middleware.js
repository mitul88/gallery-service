const jwt = require('jsonwebtoken');


module.exports.auth = {
    authCheck: async (req, res, next) => {
        let token = req.header('authorization');
        if(!token) return res.status(401).send("Access denied, No token provided");

        else token = token.split(" ")[1].trim();
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded) return res.status(400).send("Invalid token !!");

        req.user = decoded;
        next();
    }
}