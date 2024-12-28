import express from "express"; // Correct import statement
import { test, updateUser } from "../controllers/user,controllers.js";
import { verifyTokens } from "../utils/verifyUser.js";

const router = express.Router(); // Correct instantiation of router

router.get("/test", test);

router.put("/update/:userId", verifyTokens, updateUser);

export default router; // Don't forget to export the router
