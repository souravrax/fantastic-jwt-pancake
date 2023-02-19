import jwt, { Secret } from 'jsonwebtoken';
import { refreshTokenDatabase, userDatabase } from '../../database/database';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as Secret;

const LogoutHandler = async (req: any, res: any) => {
    const { cookies } = req;
    const refreshToken = cookies['refreshToken'] as string;
    if (!refreshToken) {
        return res.status(401).send('Invalid request, User is not logged in');
    }
    jwt.verify(refreshToken, refreshTokenSecret, (err, data) => {
        if (err) {
            return res.status(400).send('Invalid user token');
        }
        const userData = userDatabase.getUserData((data as any).username as string)
        console.log(`${userData.name}(${userData.username}) Logged Out`)
        refreshTokenDatabase.delete(refreshToken)
        res.clearCookie('refreshToken');
        res.status(200).send(
            `User: ${(data as any).username} Successfully Logged Out`
        );
    });
};
export default LogoutHandler;
