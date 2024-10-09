import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPost,
  getPosts,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";
const router = express.Router();

//all posts
router.get("/", getPosts);

//single post
router.get("/:id", getPost);

//handle CRUD operations

//create
router.post("/", verifyToken, addPost);
//edit
router.put("/:id", verifyToken, updatePost);
//delete
router.delete("/:id", verifyToken, deletePost);

export default router;
