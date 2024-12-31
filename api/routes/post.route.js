import express from "express";
import { verifyTokens } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyTokens, create);

export default router;
