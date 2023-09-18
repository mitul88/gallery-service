const _ = require('lodash')
const jwt_decode = require('jwt-decode')
const { User } = require("./user.model")
const { Profile } = require('./profile.model')
const { default: mongoose } = require('mongoose')

module.exports.getUser = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id)
        
        let user = await User.findOne({_id: id})
        let profile = await Profile.findOne({userId: id})
        let userProfile = Object.assign(user, _.pick(profile, ["phone", "dob", "profession", "bio", "skills", "profile_photo",]))
        
        if (user) {
            return res.status(200).send({
                status: true,
                message: "User profile",
                data: _.pick(userProfile, ["_id", "profile_photo", "name", "email", "phone", "dob", "profession", "bio", "skills", "createdAt"]),
            })
        } else {
            return res.status(200).send({
                status: false,
                message: "user not found",
            })
        }
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err
        })
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        let header = req.headers.authorization
        let token = header.split(" ")
        let decoded = await jwt_decode(token[1]);
        let id = decoded._id
        const {
            name, 
            phone,
            dob,
            profession,
            bio,
            skills
        } = req.body

        let user = await User.findById( id );
        
        if (user) {
            user.name = name
            await user.save()
        }

        let profile = await Profile.findOne({userId: id})

        if (!profile) {
            let createdProfile = new Profile({userId: id});
            createdProfile.phone = phone
            createdProfile.dob = dob
            createdProfile.profession = profession
            createdProfile.bio = bio
            createdProfile.skills = skills
            createdProfile.save()
        } else {
            profile.phone = phone
            profile.dob = dob
            profile.profession = profession
            profile.bio = bio
            profile.skills = skills
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