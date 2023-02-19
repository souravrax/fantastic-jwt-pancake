import { Request, Response } from 'express';
import { UserInfoSchema } from '../../database/schema';
import { userDatabase } from '../../database/database';
const CreateUserHandler = (req: Request, res: Response) => {
    const { body } = req;
    if (!body) res.sendStatus(400);
    const name = body.name;
    const username = body.username;
    const password = body.password;
    if (!name || !username || !password)
        return res.send('Name/Username/Password Required');

    userDatabase.createUser({
        name: name as string,
        password: password as string,
        username: username as string,
    });

    console.log(`User Account Created: ${name}(${username})`);
    res.status(200).send(`User Account Created: ${name}(${username})`);
};

export default CreateUserHandler