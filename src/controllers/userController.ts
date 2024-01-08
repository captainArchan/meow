
import * as dotenv from 'dotenv';
import { hashPassword, createNewUser, findUser, comparePassword, createToken } from '../Services/userService';
dotenv.config();

export const registerUser = async (req: any, res: any) => {
    try {
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
                            "One of the following keys is missing or is empty in request body: 'username', 'password', 'firstname', 'lastname', 'tel', 'email'",
                    },
                });
            return;
        };

        const newUser = {
            username: body.username,
            password: await hashPassword(body.password),
            firstname: body.firstname,
            lastname: body.lastname,
            tel: body.tel,
            email: body.email
        }
        const createUser = await createNewUser(newUser);
        res.status(201).send({ status: "OK", data: createUser });

    } catch (err: any) {
        res
            .status(err?.status || 500)
            .send({ status: "FAILED", data: { err: err?.message || err } })
        // .send({status: "FAILED", data: {err: (err as { message: string })?.message || err}})
    }

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