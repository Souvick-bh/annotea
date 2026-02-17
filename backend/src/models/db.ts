import mongoose,{Schema} from "mongoose";
import {env} from "../config/env.js";

export const connectDB = async() => {
    try {
        await mongoose.connect(env.MONGO_STRING).then(()=> console.log("DB connected Successfully"));
    } catch (error) {
        console.error("Got an issue",error);
    }
}
