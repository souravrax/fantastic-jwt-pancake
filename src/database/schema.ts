export type UserInfoSchema = {
    id: number;
    name: string;
    username: string;
    password: string;
    products?: string[];
    roles?: string[]
}