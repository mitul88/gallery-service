const _ = require('lodash')
const jwt_decode = require('jwt-decode')
const { User } = require("../user/user.model")
const {Image} = require('./image.model')
const { uploader } = require('cloudinary').v2
const { dataUri } = require('../../upload/multerUpload')

module.exports.createImage = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const uploaded_by = decoded._id
    const {title, category, desc} = req.body
    
    try {
        const image = new Image({title, desc, category, uploaded_by})
        if(req.file) {
            console.log(req.file)
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            console.log(result)
            image.url = result.url;
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
    
}

module.exports.editImage = async (req, res) => {
    
}

module.exports.deleteImage = async (req, res) => {
    
}