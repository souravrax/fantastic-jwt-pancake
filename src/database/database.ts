import { CreateUserType } from '../types/auth.type';
import { UserInfoSchema } from './schema';

class UserDatabase {
    database: UserInfoSchema[];
    constructor() {
        this.database = [];
    }

    createUser(user: CreateUserType) {
        this.database.push({
            ...user,
            id: this.database.length,
        });
    }

    getAllUsers() {
        return this.database;
    }

    getUserData(username: string): UserInfoSchema | undefined {
        return this.database.find((user) => user.username === username);
    }

    exists(username: string, password: string) {
        return (
            this.database.find(
                (user) =>
                    user.username === username && user.password === password
            ) !== undefined
        );
    }
}

class RefreshTokenDatabase {
    database: string[];
    constructor() {
        this.database = [];
    }

    isValid(refreshToken: string) {
        return (
            this.database.find((token) => token == refreshToken) !== undefined
        );
    }

    push(refreshToken: string) {
        this.database.push(refreshToken);
    }

    delete(refreshToken: string) {
        this.database = this.database.filter((token) => token !== refreshToken);
    }
}

export const refreshTokenDatabase = new RefreshTokenDatabase();
export const userDatabase = new UserDatabase();
