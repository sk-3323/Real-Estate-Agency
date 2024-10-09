import express from "express";
import { isAdmin, isLoggedin } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/is-loggedin", verifyToken, isLoggedin);

router.get("/is-admin", isAdmin);

export default router;
