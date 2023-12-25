import { Router } from 'express';
import { compare, hash } from 'bcrypt';
import * as dotenv from 'dotenv';
import registerDB from '../../models/userSchema';
import { sign } from 'jsonwebtoken';

dotenv.config();
export const login = Router();

login.post('/register', async (req, res) => {
    let user = req.body
    try {
        user.password = await hash(user.password, 10)
        await registerDB.create(user)
        res.send('success')
    } catch (err) {
        console.log(err)
    }
});

login.post('/login', async (req, res) => {
    let { username, password } = req.body
    let user = await registerDB.findOne({ username: username })
    if (user && await compare(password, user.password)) {
        const token = sign(
            {user = user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )
    }
})