const {Like} = require('./like.model')
const {Image} = require('../image/image.model')
const _ = require('lodash')
const jwt_decode = require('jwt-decode')

module.exports.likeCounts = async(req, res) => {
    const header = req.headers?.authorization
    let token;
    let current_user;
    
    if (req.headers.authorization) {
        token = header.split(" ")
        const decoded = await jwt_decode(token[1]);
        current_user = decoded._id
    }
    
    const id = req.params.imageId

    const likeCount = await Like.countDocuments({image_id: id})
    let current_user_likes = false;
    if(token) {
        const likes = await Like.findOne({image_id: id, user_id: current_user})
        if (likes) current_user_likes = true
    }
    
    return res.status(200).send({
        status: true,
        message: "categories fetched",
        data: {likeCount, current_user_likes}        
    })
}

module.exports.like = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const user_id = decoded._id
    const user_name = decoded.name

    const image_id = req.body.image_id
    
    if (!image_id) return res.status(400).send({status: false, message: '"image_id" is missing in body'})
    
    const likeDetails = {}

    try {
        const image = await Image.findById(image_id)
        likeDetails.likedBy = user_name
        likeDetails.likedImage = image.title
        likeDetails.likedImageDesc = image.desc
        likeDetails.likedImageUrl = image.url

        const userLike = new Like({user_id: user_id, image_id: image_id})
        userLike.likeDetails = likeDetails
        await userLike.save()
        return res.status(200).send({status: true, message: 'Liked'})
    } catch(err) {
        return res.status(500).send({
            status: false,
            message: 'internal error'
        })
    }
}

module.exports.removeLike = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const user_id = decoded._id
 
    const image_id = req.body.image_id
    if (!image_id) return res.status(400).send({status: false, message: '"image" is missing'})

    try {
        await Like.findOneAndDelete({user_id: user_id, image_id: image_id})
        return res.status(200).send({status: true, message: 'Unliked'})
    } catch(err) {
        return res.status(500).send({
            status: false,
            message: 'internal error'
        })
    }
}