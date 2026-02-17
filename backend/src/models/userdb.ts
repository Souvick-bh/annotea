import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {type: String,},
    email: {type: String, required: true, unique: true},
    userid: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


export const USER = mongoose.model("User", userSchema);
