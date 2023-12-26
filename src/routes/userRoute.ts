import { Router } from 'express';
import { registerUser, loginUser } from '../Controllers/userController';
export const user = Router();

user.post('/register', registerUser);
user.post('/login', loginUser);