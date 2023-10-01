const _ = require('lodash')
const jwt_decode = require('jwt-decode')
const { User } = require("../user/user.model")
const { Like } = require("../like/like.model")
const { Comment } = require("../comment/comment.model")
const {Image} = require('./image.model')
const { uploader } = require('cloudinary').v2
const { dataUri } = require('../../upload/multerUpload');
const { default: mongoose } = require('mongoose')

module.exports.createImage = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const uploaded_by = decoded._id
    const {title, category, desc} = req.body
    
    try {
        const image = new Image({title, desc, category, uploaded_by})
        if(req.file) {
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            image.url = result.url;
            image.asset_details = result
        }
        await image.save()
        return res.status(200).send({
            status: true,
            message: "Image created",
            data: _.pick(image, ["title", "category", "url", "created_at"])
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }


}

module.exports.viewImage = async (req, res) => {
    const id = req.params.id
    try{
        const image = await Image.findById(id).populate('category').populate({path: 'uploaded_by', select: 'name'})
        const imageLikes = await Like.count({image_id: id})
        const commentsCount = await Comment.count({image_id: id})
        const allComments = await Comment.find({image_id: id})

        return res.status(200).send({
            status: true,
            message: "Image fetched",
            data: {
                likes: imageLikes,
                comments: commentsCount,
                allComments,
                image
            }
        })
    }catch(err) {
        console.log(err)
        return res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
}

module.exports.imageList = async (req, res) => {

    const page = req.query.page? req.query.page : 1
    const limit = req.query.limit? req.query.limit : 10
    const category = req.query.category? req.query.category : null
    const user = req.query.user
    let args = {}
    if(category) Object.assign(args, {category})
    if(user) Object.assign(args, {uploaded_by : user})
    
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {createdAt: -1},
        populate: [{
            path: 'category',
            select: 'name'
        }, {
            path: 'uploaded_by',
            select: 'name'
        }]
    }

    const agg = [
        {
          '$lookup': {
            'from': 'likes',
            'localField': '_id',
            'foreignField': 'image_id',
            'as': 'likes'
          }
        },{
            '$lookup': {
              'from': 'comments',
              'localField': '_id',
              'foreignField': 'image_id',
              'as': 'comments'
            }, 
        },{
            '$lookup': {
              'from': 'users',
              'localField': 'uploaded_by',
              'foreignField': '_id',
              'as': 'posted_by'
            }
        }, {
            '$addFields' : {
                'likesCount': {'$size': '$likes'},
                'commentsCount': {'$size': '$comments'}
            }
        }
    ]

    // populate user will not work with "Mongoose aggregate paginate"
    const aggregate = Image.aggregate(agg);
    const data = await Image.aggregatePaginate(aggregate, options);

    try {
        return res.status(200).send({
            status: true,
            message: "images fetched",
            // data: await Image.paginate(args, options)
            data
        })
    }catch(err) {
        return res.status(500).send({
            status: false,
            message: "Internal server error",
            err
        })
    }
}

module.exports.deleteImage = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const userId = mongoose.Types.ObjectId(decoded._id)

    const id = req.params.imageId

    try {
        const image = await Image.findById(id)
        
        if( String(image.uploaded_by) !== String(userId) ) return res.status(401).send({status: false, message: "You are not authorized!"})
        
        await uploader.destroy(image.asset_details.public_id, {invalidate: true})
        await Image.deleteOne({_id: id})
        await Comment.deleteMany({image_id: id})
        await Like.deleteMany({image_id: id})
        return res.status(200).send({
            status: true,
            message: "Image deleted"
        })
    }catch(err) {
        return res.status(500).send({
            status: false,
            message: "Internal server error",
        })
    }
}