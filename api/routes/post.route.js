import express from "express";
import { verifyTokens } from "../utils/verifyUser.js";
import { create, getposts } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyTokens, create);
router.get("/getposts", verifyTokens, getposts);

export default router;
