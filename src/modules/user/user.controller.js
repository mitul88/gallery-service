const _ = require('lodash');
const jwt_decode = require('jwt-decode');
const { User } = require("./user.model");
const { Profile } = require('./profile.model');
const { default: mongoose } = require('mongoose');
const { dataUri } = require('../../upload/multerUpload');
const { uploader } = require('cloudinary').v2;
const bcrypt = require('bcrypt');

module.exports.getUser = async (req, res) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id)
        
        let user = await User.findOne({_id: id})
        let profile = await Profile.findOne({userId: id})
        let userProfile = Object.assign(user, _.pick(profile, ["phone", "dob", "profession", "bio", "interest", "profile_photo",]))
        
        if (user) {
            return res.status(200).send({
                status: true,
                message: "User profile",
                data: _.pick(userProfile, ["_id", "profile_photo", "name", "email", "phone", "dob", "profession", "bio", "interest", "createdAt"]),
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
        } = req.body
    let userId = req.params.id;
    console.log(req.body)
    if (userId !== id) return res.status(401).send({status: false, message: "You are not authoried!"})
    if(name === "") return res.status(400).send({status: false, message: "Name cannot be empty"})
    try {
        let user = await User.findById( userId );

        if (!user) return res.status(400).send({status: false, message: "user not found!"});
        
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
            await createdProfile.save()
        } else {
            profile.phone = phone
            profile.dob = dob
            profile.profession = profession
            profile.bio = bio
            await profile.save()
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

    const {currentPass, newPass, confirmNewPass} = req.body
    const user = await User.findById(id)
    console.log(req.body)
    const validUser = await bcrypt.compare(currentPass, user.password)
        if(!validUser) {
            return res.status(401).send({
                status: false,
                message: "Current password is incorrect"
            })
        } else {
            if (newPass !== confirmNewPass ) return res.status(400).send({status: false, message: "Confirm password is not matching with new password !!"})
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(confirmNewPass, salt)
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

module.exports.singleUpdate = async (req, res) => {
        let header = req.headers.authorization
        let token = header.split(" ")
        let decoded = await jwt_decode(token[1]);
        let id = decoded._id
        const {
            profession,
            bio,
            interest
        } = req.body

        let userId = req.params.userId;

        if(id !== userId) return res.status(401).send({status: false, message: "You are not authorized!"})

    try {
        let profile = await Profile.findOne({userId: id})
        if (!profile) {
            profile = new Profile({userId: id})
        }

        if (profession) {
            if (profession === "") return res.status(400).send({status: false, message: "Please enter your profession"})
            profile.profession = profession
        }
        if (bio) {
            if (bio === "") return res.status(400).send({status: false, message: "Please enter your bio"})
            profile.bio = bio
        }

        await profile.save();

        if (interest) {
            if (interest === "") return res.status(400).send({status: false, message: "Please enter your interest"})
            await Profile.updateOne({userId: userId}, {$push:{interest: interest}})
        }

        return res.status(200).send({
            status: true,
            message: `entry updated successfully !`,
        })

    } catch(err) {
        console.log(err.message)
        return res.status(200).send({
            status: true,
            message: err.message,
        })
    }
}

module.exports.uploadeProfilePicture = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const uploaded_by = decoded._id
    
        if(req.file) {
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            let profile = await Profile.findOne({userId: uploaded_by})
            if(!profile) {
                let createdProfile = new Profile({userId: uploaded_by});
                createdProfile.profile_photo = result.url;
                createdProfile.asset_details = result
                await createdProfile.save();
            } else {
                profile.profile_photo = result.url;
                profile.asset_details = result;
                await profile.save();
            }
        }
       

    return res.status(200).send({
        status: true,
        message: "Profile photo uploaded"
    })
}

module.exports.deleteProfilePhoto = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const uploaded_by = decoded._id;
    const authUserId = req.params.userId;

    if(authUserId !== uploaded_by) return res.status(401).send({status: false, message: "You are not authorized!"})

    const profile = await Profile.findOne({userId: uploaded_by});

    if(!profile) return res.status(400).send({status: false, message: "Profile not created yet"});
    if(!profile.profile_photo) return res.status(400).send({status: false, message: "User photo not found"});

    try {
        await uploader.destroy(profile.asset_details.public_id, {invalidate: true});
        profile.asset_details = undefined;
        profile.profile_photo = undefined;
        await profile.save();
        return res.status(200).send({status: true, message: "Profile photo deleted!"})
    } catch(err) {
        return res.status(500).send({
            status: false,
            message: "Internal server error",
        })
    }


}

module.exports.changeProfilePhoto = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const uploaded_by = decoded._id;
    const authUserId = req.params.userId;

    if(authUserId !== uploaded_by) return res.status(401).send({status: false, message: "You are not authorized!"})

    try {
        const profile = await Profile.findOne({userId: uploaded_by});
        if(!profile) return res.status(422).send({status: false, message: "Profile not created yet, Upload a profile photo first."});
        
        if (profile.user_photo === null) return res.status(422).send({status: false, message: "Your current photo dose not exist."});
    
        if(req.file) {
            await uploader.destroy(profile.asset_details.public_id, {invalidate: true});
            const file = dataUri(req).content;
            const result = await uploader.upload(file);
            profile.profile_photo = result.url;
            profile.asset_details = result;
            await profile.save();
        } else {
            return res.status(400).send({status: "400", message: "Please select image to upload"})
        }
        
        return res.status(200).send({status: true, message: "Profile photo updated"})
    } catch(err) {
        return res.status(500).send({
            status: false,
            message: "Internal server error",
        })
    }
}

module.exports.deleteBio = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const authUserId = decoded._id;
    const userId = req.params.userId;

    if(authUserId !== userId) return res.status(401).send({status: false, message: "You are not authorized!"}) 

    try {
        const profile = await Profile.findOne({userId: userId});
        profile.bio = undefined;
        await profile.save();

        return res.status(200).send({status: true, message: "Bio deleted"})
    } catch( error) {
        return res.sstatus(500).send({status: false, message: "Internal server error"})
    }
}

module.exports.deleteInterest = async (req, res) => {
    const header = req.headers.authorization
    const token = header.split(" ")

    const decoded = await jwt_decode(token[1]);
    const authUserId = decoded._id;
    const userId = req.params.userId;

    const interest = req.params.interest;

    if(authUserId !== userId) return res.status(401).send({status: false, message: "You are not authorized!"}) 
    console.log(interest)

    try {
        if (interest === "") return res.status(400).send({status: false, message: "Please enter your interest"})
        await Profile.updateOne({userId: userId}, {$pull:{interest: interest}})
        return res.status(200).send({status: true, message: "interest deleted"})
    } catch( error) {
        return res.sstatus(500).send({status: false, message: "Internal server error"})
    }
}