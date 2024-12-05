import express from "express"; // Correct import statement
import { test } from "../controllers/user,controllers.js";
const router = express.Router(); // Correct instantiation of router

router.get("/test", test);

export default router; // Don't forget to export the router
