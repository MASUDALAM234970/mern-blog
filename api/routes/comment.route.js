import express from "express";
import { verifyTokens } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getcomments,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyTokens, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyTokens, likeComment);
router.put("/editComment/:commentId", verifyTokens, editComment);
router.delete("/deleteComment/:commentId", verifyTokens, deleteComment);
router.get("/getcomments", verifyTokens, getcomments);

export default router;
