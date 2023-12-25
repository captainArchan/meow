import mongoose from "mongoose";
import * as dotenv from 'dotenv';

export const connectDatabase = () =>{
    dotenv.config();
    let database = process.env.DATABASE!;
    mongoose.connect(database);
    // const model = mongoose.model(name, schema)
}
