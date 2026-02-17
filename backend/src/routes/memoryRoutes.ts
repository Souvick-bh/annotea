import { Router } from "express";
import * as memorycontroller from "../controllers/memorycontroller.js";
import { authmiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/creatememory", authmiddleware, memorycontroller.createMemory);
router.get("/getallmemory", authmiddleware, memorycontroller.getAllMemory);
router.delete("/:ucode", authmiddleware, memorycontroller.deleteMemory);
router.patch("/:ucode", authmiddleware,memorycontroller.shareMemory);
router.put("/:ucode", authmiddleware, memorycontroller.updateMemory);
router.get("/:ucode", memorycontroller.getMemory);

export default router;