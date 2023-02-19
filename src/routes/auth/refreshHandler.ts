import jwt from 'jsonwebtoken';
import { generateAccessToken, refreshTokenSecret } from './tokenService';
const RefreshHandler = async (req: any, res: any) => {
    const { cookies } = req;
    const refreshToken = cookies['refreshToken'] as string;
    if (!refreshToken) {
        return res.status(401).send('Invalid Request, unable to create new token');
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, data) => {
        if (err) return res.status(401).send('Invalid Request, unable to create new token');
        res.status(200).json({
            accessToken: generateAccessToken((data as any).username),
        });
    });
};

export default RefreshHandler;
