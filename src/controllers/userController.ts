
import * as dotenv from 'dotenv';
import { hashPassword, createNewUser, findUser, comparePassword, createToken } from '../Services/userService';
dotenv.config();

export const registerUser = async (req: any, res: any) => {
    const { body } = req;
    if (
        !body.username ||
        !body.password ||
        !body.firstname ||
        !body.lastname ||
        !body.tel ||
        !body.email
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
                },
            });
        return;
    };

    const newUser = {
        username: body.username,
        password: await hashPassword(body.password),
        fname: body.firstname,
        lname: body.lastname,
        tel: body.tel,
        email: body.email
    }

    const createUser = createNewUser(newUser);
    res.status(201).send({ status: "OK", data: createUser });
}

export const loginUser = async (req: any, res: any) => {
    try {
        let { username, password } = req.body
        let user = await findUser(username);
        if (user && await comparePassword(user.password, password)) {
            const token = createToken(user._id, user.email);
            res.status(200).json(token)
        } else {
            res.status(400).json('Invalid')
        }
    } catch (err) {
        console.log(err)
    }
}