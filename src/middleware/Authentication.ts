import CustomError from "../models/CustomError";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const Authentication = (req, res, next) => {
    try{
        const authHeader: string = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')){
            throw new CustomError("Token Authentication Failed", 503)
        }

        const token = authHeader.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.user = {
            id: payload.id || '0',
            name: payload.name || 'Default Name'
        }
        next();
    }catch(err){
        throw new CustomError("Token verification Failed", 503)
    }
}