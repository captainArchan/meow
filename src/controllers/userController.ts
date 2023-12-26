
import * as dotenv from 'dotenv';
import { hashPassword, createNewUser, findUser, comparePassword, createToken } from '../Services/userService';
dotenv.config();

export const registerUser = async (req:any, res:any) =>{
    let user = req.body
    try {
        user.password = await hashPassword(user.password);
        createNewUser(user)
        res.send('register success')
    } catch (err) {
        console.log(err)
    }
}

export const loginUser = async(req:any, res:any) => {
    try{
        let { username, password } = req.body
        let user = await findUser(username);
        if (user && await comparePassword(user.password, password)) {
            const token = createToken(user._id, user.email);
            res.status(200).json(token)
        }else{
            res.status(400).json('Invalid')
        }
    }catch(err){
        console.log(err)
    }
}