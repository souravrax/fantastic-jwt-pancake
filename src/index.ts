import express from 'express';
import cors from 'cors';
require('dotenv').config();
import cookieParser from 'cookie-parser';

import AuthRouter from './routes/auth';
import PostsRouter from './routes/posts'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/posts', PostsRouter);

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
    console.log('server started at port: ' + PORT);
});
