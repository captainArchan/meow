import * as dotenv from 'dotenv';
import {verify} from 'jsonwebtoken'
dotenv.config();
export const verifyToken = (req:any, res:any, next: any) =>{
    const token = req.query.token || req.headers['x-access-token'];
    console.log(token)
    if(!token) {
        return res.status(403).send('plase login')
    }

    try{
        const decoded = verify(token, process.env.TOKEN_KEY!);
        req.user = decoded
    }catch(err){
        return res.status(401).send("invalid token")
    }
    return next();
}