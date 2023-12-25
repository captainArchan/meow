import express from 'express';
import * as dotenv from 'dotenv';
import { router } from './routes';
import { login } from './routes/login';
import {connect} from 'mongoose';
// import cors from 'cors';

dotenv.config();
const app = express();
let port = process.env.port;
let database = process.env.DATABASE!;

connect(database);

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded



app.use('/', router);
app.use('/', login);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})