import { compare, hash } from 'bcrypt';
import { createUser, findOne } from '../database/User';
import * as dotenv from 'dotenv';
import { sign } from 'jsonwebtoken'
dotenv.config();


export const findUser = (username: string) => {
    const user = findOne(username);
    return user
}

export const comparePassword = async(loginPassword: string, password: string) => {
    try{
        console.log (await compare(password, loginPassword))
        return compare(password, loginPassword)
    }catch(err){
        throw(err)
    }

}
export const createNewUser = async (user: Object) => {
    try{
        const newUser = await createUser(user);
        return newUser
    }catch(err){
        throw(err);
    }
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