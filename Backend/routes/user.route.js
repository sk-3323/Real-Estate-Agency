import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  savePost,
  fetchProfileList,
  fetchNotificationCount,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);

// router.get("/:id", verifyToken, getUser);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.post("/save", verifyToken, savePost);

router.get("/fetchProfileList", verifyToken, fetchProfileList);

router.get("/notifications", verifyToken, fetchNotificationCount);

export default router;
