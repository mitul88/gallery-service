const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User } = require('../user/user.model')


module.exports.register = async (req, res) => {  
    const {name, email, password} = req.body
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(!name || !email || !password) {
        return res.status(400).send({ status: false, message: "Please fill up required information"})
    }
    
    if(!emailRegex.test(email)) {
        return res.status(400).send({status: false, message: "enter valid email"})
    }

    const user = await User.findOne({email})

    if(user) {
        return res.status(400).send({ status: false, message: "Email already registered" })
    }else {
        try {
            const user = new User({email, name})
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            const token = user.generateJWT()

            return res.status(201).send({
                status: true,
                message: "User registered",
                token
            })
        } catch (error) {
            return res.status(400).send({
                status: false,
                message: error.message
            })
        }
        
    }
}

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    const url = req.originalUrl

    if(!email || !password) {
         return res.status(422).send({
             status: false,
             message: "Please fill up required information"
         })
     }
     try{
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).send({
                status: false,
                message: "Email not registered"
            })
        } else {        
            const validUser = await bcrypt.compare(req.body.password, user.password)
            if(!validUser) {
                return res.status(401).send({
                    status: false,
                    message: "Please enter correct password"
                })
            } else {
                const token = user.generateJWT()
                return res.status(200).send({
                    status: true,
                    message: "User sign in successfull",
                    token
                })
            }
        }
       
     } catch(error) {
        console.log(error)
        return res.status(500).send({message: "internal server error"})
     }

}