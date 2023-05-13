import { MongoClient, ServerApiVersion } from "mongodb";
import { CreateUserType } from "../types/auth.type";

const MONGO_URI: string = process.env.MONGO_URI as string;

const client = new MongoClient(MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

client.connect();
const db = client.db(process.env.DATABASE_NAME as string);
const userCollection = db.collection(process.env.USER_COLLECTION as string);
const tokenCollection = db.collection(process.env.TOKEN_COLLECTION as string);
tokenCollection.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const createUser = async (user: CreateUserType) => {
    userCollection.insertOne(user);
};

export const getAllUsers = async () => {
    return await userCollection.find().toArray();
};

export const getUserData = async (username: string) => {
    return await userCollection.findOne({
        username,
    });
};

export const isValidUser = async (username: string, password: string) => {
    return (
        (await userCollection.findOne({
            username,
            password,
        })) !== null
    );
};

export const isValidToken = async (token: string) => {
    return (await tokenCollection.findOne({ token })) !== null;
};

export const insertToken = async (token: string, expireAt: Date) => {
    return await tokenCollection.insertOne({
        token,
        expireAt,
    });
};

export const deleteToken = async (token: string) => {
    return await tokenCollection.deleteOne({ token });
};

export const deleteAllToken = async () => {
    await tokenCollection.deleteMany();
};

// deleteAllToken()
