const {Like} = require('./like.model')
const {Image} = require('../image/image.model')
const _ = require('lodash')
const jwt_decode = require('jwt-decode')

module.exports.like = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const user_id = decoded._id
    const user_name = decoded.name

    const image_id = req.query.image
    if (!image_id) return res.status(400).send({status: false, message: '"image" is missing in search parameter'})
    
    const likeDetails = {}

    try {
        const image = await Image.findById(image_id)
        likeDetails.likedBy = user_name
        likeDetails.likedImage = image.title
        likeDetails.likedImageDesc = image.desc
        likeDetails.likedImageUrl = image.url

        const userLike = new Like({userId: user_id, imageId: image_id})
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
 
    const image_id = req.query.image
    if (!image_id) return res.status(400).send({status: false, message: '"image" is missing in search parameter'})

    try {
        await Like.findOneAndDelete({userId: user_id, imageId: image_id})
        return res.status(200).send({status: true, message: 'Liked'})
    } catch(err) {
        return res.status(500).send({
            status: false,
            message: 'internal error'
        })
    }
}