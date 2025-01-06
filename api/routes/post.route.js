import express from "express";
import { verifyTokens } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyTokens, create);
router.get("/getposts", verifyTokens, getposts);
router.delete("/deletepost/:postId/:userId", verifyTokens, deletepost);
router.put("/updatepost/:postId/:userId", verifyTokens, updatepost);

export default router;
