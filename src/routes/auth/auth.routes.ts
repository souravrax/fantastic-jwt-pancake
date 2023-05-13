import express from "express";
import LogoutHandler from "./logoutHandler";
import LoginHandler from "./loginHandler";
import RefreshHandler from "./refreshHandler";
import CreateUserHandler from "./createUserHandler";

const AuthRouter = express.Router();
AuthRouter.post("/login", LoginHandler)
    .post("/token", RefreshHandler)
    .delete("/logout", LogoutHandler)
    .post("/create-user", CreateUserHandler);

export default AuthRouter;
