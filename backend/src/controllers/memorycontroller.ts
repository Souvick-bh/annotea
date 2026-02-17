import { type Request,type Response,type NextFunction } from "express";
import * as z from "zod";
import { nanoid } from "nanoid";
import { MEMORY } from "../models/memorydb.js";

interface UpdatedReq extends Request {
    currentuser?: string
}

const memoSchema = z.object({
    title: z.string(),
    content: z.string()
})

export const createMemory = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    try {
        const user = req.currentuser;
        if(!user) return res.status(401).json({message: "User not found."})
        const {title,content} = memoSchema.parse(req.body);
        const ucode = nanoid(16);
        const sharable = false;
        await MEMORY.create({ucode,title,content,sharable,createdBy: user});
        return res.status(200).json({message: "Memory created successfully."});
    } catch (err) {
        console.error("Got an issue.",err);
    }
}

export const getAllMemory = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    try {
        const user = req.currentuser;
        if(!user) return res.status(401).json({message: "User not found."});
        const memory_list = await MEMORY.find({createdBy: user});
        res.json({memory_list});
    } catch (err) {
        console.error("Got an issue.",err);
    }
}

export const deleteMemory = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    const ucode = req.params.ucode
    if(!ucode) return res.status(401).json({message: "Got an issue"});
    await MEMORY.deleteOne({ucode: ucode});
    res.status(200).json({message: "Successfully deleted."});
}

export const shareMemory = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    try {
        const ucode = req.params.ucode;
        if(!ucode) return res.status(401).json({message: "Got an issue"});
        await MEMORY.updateOne({ucode: ucode}, {$set: {sharable: true}});
        // alert("http://localhost:7777/v1/memory/:"+ucode)
        return res.status(200).json({message: "Link generated."})
    } catch (error) {
        console.error(error);
    }
}

export const updateMemory = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    try {
        const ucode = req.params.ucode;
        if(!ucode) return res.status(401).json({message: "Got an issue"});
        const {title,content} = memoSchema.parse(req.body);
        await MEMORY.updateOne({ucode: ucode}, {$set: {title: title, content: content}});
        return res.status(200).json({message: "Operation successful."})
    } catch (error) {
        console.error(error);
    }
}

export const getMemory = async(req: UpdatedReq,res: Response,next: NextFunction) => {
    try {
        const ucode = req.params.ucode;
        if(!ucode) return res.status(401).json({message: "Got an issue"});
        const memory = await MEMORY.findOne({ucode: ucode});
        if(memory?.sharable == true) {
            res.json({memory});
        } else {
            res.json({message: "This memory is not sharable."})
        }
        
    } catch (error) {
        console.error(error);
    }
}