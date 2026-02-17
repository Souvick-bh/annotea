import { type Request,type Response,type NextFunction } from "express"
import * as z from "zod";
import jwt from "jsonwebtoken"
import { USER } from "../models/userdb.js";
import { env } from "../config/env.js";

interface UpdatedReq extends Request {
    currentuser?: string,
}

const signupSchema = z.object({
    name: z.string(),
    email: z.string(),
    userid: z.string(),
    password: z.string(),
});

const loginSchema = z.object({
    userid: z.string(),
    password: z.string()
});

export const signup = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    const {name,email,userid,password} = signupSchema.parse(req.body);
    await USER.create({name,email,userid,password});
    res.status(200).json({message: "Successful Sign-Up."});
}

export const login = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    const {userid,password} = loginSchema.parse(req.body);
    const user = await USER.findOne({userid,password});
    if(!user) return res.status(401).json({message: "Wrong credentials"});
    const token = jwt.sign({userid: user.userid},env.JWT_SECRET,{expiresIn: '2 days'});
    console.log(token);
    //res.cookie("token",token);
    res.status(200).json({message: "Successful Log-In.", token: token});
}