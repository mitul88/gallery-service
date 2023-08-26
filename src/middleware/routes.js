const authRouter = require('../modules/auth/auth.routes')
const userRouter = require('../modules/user/user.routes')

module.exports = (app) => {
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
}