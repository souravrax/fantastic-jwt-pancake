import express from 'express'
import { AuthVerifyMiddleware } from '../auth'
const PostsRouter = express.Router()

PostsRouter.use(AuthVerifyMiddleware)

PostsRouter.get('/', (req, res) => {
    res.send('Hello World!')
})

export default PostsRouter