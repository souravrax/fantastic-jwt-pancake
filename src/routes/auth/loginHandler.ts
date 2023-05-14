import { getUserData, insertToken, isValidUser } from "../../database/database";
import { UserLoginInfo } from "../../types/auth.type";
import { generateRefreshToken, generateAccessToken } from "./tokenService";
import { StatusCodes } from "http-status-codes";

const userNotExist = {
    status_code: StatusCodes.NOT_FOUND,
    message: "User doesn't exist",
};

const validateUserCredentials = async ({ username, password }: UserLoginInfo) =>
    username && password && (await isValidUser(username, password));

const getExpiryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Number(process.env.TOKEN_EXPIRE as string));
    return date;
};

const LoginHandler = async (req: any, res: any) => {
    if (
        !req.body ||
        !(await validateUserCredentials(req.body as UserLoginInfo))
    ) {
        return res.status(StatusCodes.NOT_FOUND).json(userNotExist);
    }

    const { username } = req.body as UserLoginInfo;
    const userData = await getUserData(username);
    console.log(`${userData?.name}(${userData?.username}) Logged In`);

    const refreshToken = generateRefreshToken(username);
    const accessToken = generateAccessToken(username);

    const expireAt = getExpiryDate();
    await insertToken(refreshToken, expireAt);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: expireAt,
        sameSite: "none",
        secure: true,
    });
    res.status(200).json({
        status_code: 200,
        access_token: accessToken,
    });
};
export default LoginHandler;
