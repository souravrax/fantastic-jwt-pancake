import express from 'express';
import LogoutHandler from './logoutHandler';
import LoginHandler from './loginHandler';
import RefreshHandler from './refreshHandler';

const AuthRouter = express.Router();
AuthRouter
    .post('/login', LoginHandler)
    .post('/token', RefreshHandler)
    .delete('/logout', LogoutHandler);

export default AuthRouter;
