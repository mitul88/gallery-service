const authRouter = require('../modules/auth/auth.routes')
const userRouter = require('../modules/user/user.routes')
const imageRouter = require('../modules/image/image.routes')
const categoryRouter = require('../modules/category/category.routes')

module.exports = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/category', categoryRouter)
}