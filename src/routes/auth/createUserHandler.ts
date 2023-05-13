import { Request, Response } from "express";
import { createUser, getUserData } from "../../database/database";
const CreateUserHandler = async (req: Request, res: Response) => {
    const { body } = req;
    if (!body)
        res.status(400).json({
            status_code: 400,
            message: "Unexpected Error",
        });
    const name = body.name;
    const username = body.username;
    const password = body.password;
    if (!name || !username || !password)
        return res.status(403).json({
            status_code: 403,
            message: "Name/Username/Password Required",
        });

    if ((await getUserData(username)) !== null) {
        return res.status(400).json({
            status_code: 400,
            message: "Account with the username already exists",
        });
    }
    await createUser({
        name: name as string,
        password: password as string,
        username: username as string,
    });

    console.log(`User Account Created: ${name}(${username})`);
    res.status(200).json({
        status_code: 200,
        message: `User Account Created: ${name}(${username})`,
    });
};

export default CreateUserHandler;
