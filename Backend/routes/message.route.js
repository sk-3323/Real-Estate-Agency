import e from "express";
import { addMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = e.Router();

router.post("/:chatId", verifyToken, addMessage);

export default router;
