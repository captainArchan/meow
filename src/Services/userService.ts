import { compare, hash } from 'bcrypt';
import { createUser, findOne } from '../database/user';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken'
import { ObjectId } from 'mongoose';
dotenv.config();


export const findUser = (username: string) => {
    const user = findOne(username);
    return user
}
export const comparePassword = async(loginPassword: string, password: string) => {
     console.log (await compare(password, loginPassword))
    return compare(password, loginPassword)
}
export const createNewUser = (user: Object) => {
    createUser(user);
}
export const hashPassword = (password: string) => {
    const hashPassword = hash(password, 10);
    return hashPassword;
}
export const createToken = (id:object, email: string) => {
    const token = sign(
        {
            userID: id,
            userEmail: email
        },
        process.env.TOKEN_KEY!,
        {
            expiresIn: "24h"
        }
    )
    return token;
}