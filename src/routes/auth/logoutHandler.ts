import jwt, { Secret } from "jsonwebtoken";
import {
    deleteToken,
    getUserData,
    isValidToken,
} from "../../database/database";
import { StatusCodes } from "http-status-codes";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as Secret;

const invalidTokenData = {
    status_code: StatusCodes.BAD_REQUEST,
    message: "Invalid Request, User is not logged in",
};

const LogoutHandler = async (req: any, res: any) => {
    const { cookies } = req;
    const refreshToken = cookies["refreshToken"] as string;
    if (!refreshToken) {
        return res.status(StatusCodes.BAD_REQUEST).json(invalidTokenData);
    }

    res.clearCookie("refreshToken", {
        sameSite: "none",
        secure: true,
    });
    jwt.verify(refreshToken, refreshTokenSecret, async (err, data) => {
        if (err || !(await isValidToken(refreshToken))) {
            return res.status(StatusCodes.BAD_REQUEST).json(invalidTokenData);
        }
        const userData = await getUserData((data as any).username as string);
        console.log(`${userData?.name}(${userData?.username}) Logged Out`);

        await deleteToken(refreshToken);

        const user = (await getUserData((data as any).username)) as any;
        res.status(StatusCodes.OK).json({
            status_code: StatusCodes.OK,
            name: user.name,
            username: user.username,
        });
    });
};
export default LogoutHandler;
