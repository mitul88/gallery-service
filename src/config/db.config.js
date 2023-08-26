const mongoose = require('mongoose');
const { ENV_CONFIG } = require('./env.config');

const dbConnection = async (req, res) => {
    try {
        mongoose.set("strictQuery", false)
        mongoose.connect(ENV_CONFIG.mongodb_url,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            family: 4,
        })
        console.log("Connected to MongoDB!")
    } catch (error) {
        console.lpg(error)
    }
}

module.exports = dbConnection;