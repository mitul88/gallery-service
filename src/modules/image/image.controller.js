const _ = require('lodash')
const jwt_decode = require('jwt-decode')
const { User } = require("../user/user.model")
const {Image} = require('./image.model')

module.exports.createImage = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const uploaded_by = decoded._id
    const {title, category, desc} = req.body

    const imageFile = req.file
    
    try {
        const image = new Image({title, desc, category, uploaded_by})
        image.save()
        return res.status(200).send({
            status: true,
            message: "Image created",
            data: _.pick(image, ["title", "category", "created_at"])
        })
    } catch (err) {
        console.log(err.message)
    }


}

module.exports.viewImage = async (req, res) => {
    
}

module.exports.editImage = async (req, res) => {
    
}

module.exports.deleteImage = async (req, res) => {
    
}