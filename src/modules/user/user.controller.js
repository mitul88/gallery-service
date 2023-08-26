const { User } = require("./user.model")

module.exports.createUser = async (req, res) => {  

}

module.exports.getUser = async (req, res) => {
   
}

module.exports.updateUser = async (req, res) => {
   
}

module.exports.deleteUser = async (req, res) => {
   
}

// Change user password
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