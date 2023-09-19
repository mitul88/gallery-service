const {Comment} = require('./comment.model')
const jwt_decode = require('jwt-decode')

module.exports.comment = async(req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const user_id = decoded._id
    const user_name = decoded.name
    const {user_comment, image_id} = req.body
    if (!user_comment ) return res.status(400).send({message: "please fill up comment section"})
    try{
        const comment = new Comment({user_comment, image_id})
        comment.user = {id:user_id, name:user_name}
        await comment.save()
        return res.status(201).send({
            status: true,
            message: "comment posted"
        })
    }catch(err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports.getComments = async(req, res) => {
    const image_id = req.params.image_id
    try{
        const comments = await Image.find({image_id: image_id})
        return res.status(200).send({
            status: true,
            message: "comments fetched",
            data: comments
        })
    }catch(err) {
        return res.status(500).send({
            status: false,
            message: "internal server error"
        })
    }
}

module.exports.editComment = async(req, res) => {
    const id = req.params.id 
    try{
        await Comment.updateOne({_id: id},{$set: {user_comment: user_comment}})
    }catch(err) {
        return res.status(500).send({
            status: false,
            message: "internal server error"
        })
    }
}

module.exports.deleteComment = async(req, res) => {
    const id = req.params.id  

    try {
        await Comment.deleteOne({_id: id})
        
        return res.status(200).send({
            status: true,
            message: "Comment deleted"
        })
    } catch(error) {
        return res.status(400).send({
            status: false,
            message: "internal server error"
        })
    }
}