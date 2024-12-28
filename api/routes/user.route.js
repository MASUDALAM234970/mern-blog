import express from "express"; // Correct import statement
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user,controllers.js";
import { verifyTokens } from "../utils/verifyUser.js";

const router = express.Router(); // Correct instantiation of router

router.get("/test", test);

router.put("/update/:userId", verifyTokens, updateUser);
router.delete("/delete/:userId", verifyTokens, deleteUser);

export default router; // Don't forget to export the router
