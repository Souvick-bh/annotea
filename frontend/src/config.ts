import * as z from "zod";

const envFrontendSchema = z.object({
  VITE_BACKEND_URL: z.string(),
});

export const envFrontend = envFrontendSchema.parse(import.meta.env);