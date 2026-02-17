import { Router } from "express";
import * as usercontrollers from "../controllers/usercontrollers.js"

const router = Router();

router.post("/signup", usercontrollers.signup);
router.post("/login", usercontrollers.login);

export default router;