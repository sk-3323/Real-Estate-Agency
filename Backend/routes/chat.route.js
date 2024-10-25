import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "../controllers/chat.controller.js";
const router = express.Router();

//all chats
router.get("/", verifyToken, getChats);

//single post
router.get("/:id", verifyToken, getChat);

router.post("/", verifyToken, addChat);

router.put("/read/:id", verifyToken, readChat);

export default router;
