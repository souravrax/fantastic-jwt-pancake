export type UserLoginInfo = {
    username: string;
    password: string;
};

export type CreateUserType = {
    name: string;
    username: string;
    password: string;
    roles?: [],
    products?: [],
}