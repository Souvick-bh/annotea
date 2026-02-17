import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface UpdatedReq extends Request {
    currentuser?: string
}

export const authmiddleware = (req: UpdatedReq,res: Response,next: NextFunction) => {
    try {
        // const token = req.cookies?.token;
        // if(!token) {
        //     return res.status(401).json({message: "Token is missing."});
        // }
        const authHeaders = req.headers.authorization;
        if(!authHeaders) return res.status(401).json({message: "Authorization header is missing."});
        const token = authHeaders.startsWith('Bearer ')?authHeaders.slice(7):authHeaders;
        const decoded = jwt.verify(token, env.JWT_SECRET) as {userid?: string};
        if(!decoded.userid) {
            return res.status(401).json({message: "Invalid token bro."});
        } 
        req.currentuser = decoded.userid;
        next();
    } catch (error) {
        console.error("Got an issue.",error);
        return res.status(401).json({message: "Authentication failed."});
    }
}