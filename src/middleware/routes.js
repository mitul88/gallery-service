const authRouter = require('../modules/auth/auth.routes')
const userRouter = require('../modules/user/user.routes')

module.exports = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
}