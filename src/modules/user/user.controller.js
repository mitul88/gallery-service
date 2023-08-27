const _ = require('lodash')
const jwt_decode = require('jwt-decode')
const { User } = require("./user.model")

module.exports.getUser = async (req, res) => {
    try {
        let header = req.headers.authorization
        let token = header.split(" ")

        let decoded = await jwt_decode(token[1]);
        let id = decoded._id

        let user = await User.findOne({_id: id})
        if (user) {
            return res.status(200).send({
                status: true,
                message: "User profile",
                data: _.pick(user, ["name", "email", "phone"])
            })
        } else {
            return res.status(200).send({
                status: false,
                message: "user not found",
            })
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        let header = req.headers.authorization
        let token = header.split(" ")
        let decoded = await jwt_decode(token[1]);
        let id = decoded._id
        const {name, email, phone} = req.body

        let user = await User.findById( id );

        if (user) {
            user.name = name
            user.email = email
            user.phone = phone
            await user.save()
        }

        return res.status(200).send({
            status: true,
            message: "User updated successfully !",
        })

    } catch(err) {
        console.log(err.message)
        return res.status(200).send({
            status: true,
            message: err.message,
        })
    }
}

module.exports.deactivate = async (req, res) => {
    let header = req.headers.authorization
    let token = header.split(" ")
    let decoded = await jwt_decode(token[1]);
    let id = decoded._id

    let user = await User.findById( id );

    if (user & user.status != 'suspended') {
        user.status = 'deactivate'
        user.save()
        return res.status(200).send({
            status: true,
            message: "Your account has been deactivated"
        })
    } else {
        return res.status(400).send({
            status: false,
            message: "User not found"
        })
    }
}

module.exports.changePassword = async (req, res) => {
    const header = req.headers.authorization
    if (!header) return res.status(400).send({status: false, message: "Token not provided"})
    const token = header.split(" ")
    const decoded = await jwt_decode(token[1]);
    const id = decoded._id

    const {cur_pass, new_pass, con_pass} = req.body

    const user = await User.findById(id)
    const validUser = await bcrypt.compare(cur_pass, user.password)
                if(!validUser) {
                    return res.status(200).send({
                        status: false,
                        message: "Please enter correct password"
                    })
                } else {
                    if (new_pass !== con_pass ) return res.status(400).send({status: false, message: "Confirm password is not matching with new password !!"})
                    const salt = await bcrypt.genSalt(10);
                    const password = await bcrypt.hash(con_pass, salt)
                    await User.findByIdAndUpdate({_id: id}, {password}, {new: true})
                    return res.status(200).send({
                        status: true,
                        message: "Password changed successfully"
                    })
                }
}

module.exports.delete = async (req, res) => {
    let header = req.headers.authorization
    let token = header.split(" ")
    let decoded = await jwt_decode(token[1]);
    let id = decoded._id

    let user = await User.findById( id );

    if (user) {

        // work to be done. need to delete all associated entry with this one
        
        return res.status(200).send({
            status: true,
            message: "Your account has been deleted"
        })
    } else {
        return res.status(400).send({
            status: false,
            message: "User not found"
        })
    }
}