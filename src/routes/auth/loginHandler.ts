import { userDatabase, refreshTokenDatabase } from '../../database/database';
import { UserLoginInfo } from '../../types/auth.type';
import { generateRefreshToken, generateAccessToken } from './tokenService';

const LoginHandler = async (req: any, res: any) => {
    if (!req.body)
        return res.status(400).send('Please provide username and password');
    const body = req.body as UserLoginInfo;
    const username = body.username;
    const password = body.password;
    if (!username || !password || !userDatabase.exists(username, password)) {
        return res
            .status(403)
            .send('No User Found with the Username and Password');
    }

    const userData = userDatabase.getUserData(username);
    console.log(`${userData.name}(${userData.username}) Logged In`)
    const refreshToken = generateRefreshToken(username);
    const accessToken = generateAccessToken(username);
    refreshTokenDatabase.push(refreshToken);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 9999999999999),
    });
    res.status(200).json({
        accessToken,
    });
};
export default LoginHandler;
