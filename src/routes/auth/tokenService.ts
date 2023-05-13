import jwt, { Secret } from "jsonwebtoken";
import { UserLoginInfo } from "../../types/auth.type";
require("dotenv").config();

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as Secret;

export const generateAccessToken = (username: string) => {
    const accessToken = jwt.sign(
        {
            username,
        },
        accessTokenSecret,
        {
            expiresIn: "30s",
        }
    );
    return accessToken;
};

export const generateRefreshToken = (username: string) => {
    const refreshToken = jwt.sign(
        {
            username,
        },
        refreshTokenSecret
    );
    return refreshToken;
};

export const AuthVerifyMiddleware = (req: any, res: any, next: any) => {
    const accessToken = req.headers["authorization"];
    if (!accessToken) return res.sendStatus(401);
    const token = accessToken.split(" ")[1] as string;
    jwt.verify(token, accessTokenSecret, (err, data) => {
        if (err) return res.sendStatus(401);
        req.username = (data as UserLoginInfo).username;
        next();
    });
};
