import dotenv from 'dotenv';
import * as z from "zod";

dotenv.config();

const envSchema = z.object({
    MONGO_STRING: z.string(),
    JWT_SECRET: z.string()
});

export const env = envSchema.parse(process.env);