import {Schema, model} from "mongoose";
import {userRegisterInterface } from "../src/interfaces/user.interface";
const userRegister = new Schema<userRegisterInterface>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const usersDB = model('users', userRegister);

export default usersDB;