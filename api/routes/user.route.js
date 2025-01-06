import express from "express"; // Correct import statement
import {
  deleteUser,
  getUsers,
  signout,
  test,
  updateUser,
} from "../controllers/user,controllers.js";
import { verifyTokens } from "../utils/verifyUser.js";

const router = express.Router(); // Correct instantiation of router

router.get("/test", test);

router.put("/update/:userId", verifyTokens, updateUser);
router.delete("/delete/:userId", verifyTokens, deleteUser);
router.post("/signout", verifyTokens, signout);
router.get("/getusers", verifyTokens, getUsers);

export default router; // Don't forget to export the router
