import express from "express";
import { verifyTokens } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyTokens, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyTokens, likeComment);
//router.put("/editComment/:commentId", verifyToken, editComment);
//router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
//router.get("/getcomments", verifyToken, getcomments);

export default router;
