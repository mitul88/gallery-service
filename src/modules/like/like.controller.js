const {Like} = require('./like.model')
const _ = require('lodash')
const jwt_decode = require('jwt-decode')

module.exports.like = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const user_id = decoded._id
    const user_name = decoded.name

    
}

module.exports.removeLike = async (req, res) => {

}