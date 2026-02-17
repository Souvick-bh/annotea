import express from "express";
import cookieParser from "cookie-parser"
import cors from 'cors'
import userRoutes from "./routes/userRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import { connectDB } from "./models/db.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

connectDB();

app.use("/v1/user", userRoutes);
app.use("/v1/memory", memoryRoutes);

app.listen(7777, () => console.log("Your server started..."))