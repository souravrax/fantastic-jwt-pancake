import jwt from "jsonwebtoken";
import { generateAccessToken, refreshTokenSecret } from "./tokenService";
import { StatusCodes } from "http-status-codes";
import { isValidToken } from "../../database/database";

const invalidTokenData = {
    status_code: StatusCodes.BAD_REQUEST,
    message: "Invalid Request, Token refresh failed",
};

const RefreshHandler = async (req: any, res: any) => {
    const { cookies } = req;
    const refreshToken = cookies["refreshToken"] as string;
    if (!refreshToken || !(await isValidToken(refreshToken))) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalidTokenData);
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, data) => {
        if (err) return res.status(401).json(invalidTokenData);
        res.status(200).json({
            status_code: StatusCodes.OK,
            access_token: generateAccessToken((data as any).username),
        });
    });
};

export default RefreshHandler;
