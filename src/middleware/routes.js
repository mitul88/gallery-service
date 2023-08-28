const authRouter = require('../modules/auth/auth.routes')
const userRouter = require('../modules/user/user.routes')
const imageRouter = require('../modules/image/image.routes')
const categoryRouter = require('../modules/category/category.routes')
const commentRouter = require('../modules/comment/comment.routes')
const likeRouter = require('../modules/like/like.routes')

module.exports = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/comment', commentRouter)
    app.use('/api/like', likeRouter)
}