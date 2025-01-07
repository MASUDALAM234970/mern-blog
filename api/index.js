import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoures from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongoose is connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const app = express();
app.use(express.json()); // Add middleware for JSON parsing
app.use(cookieParser()); // Add middleware for cookie parsing

app.use("/api/user", UserRoutes); // Use routes for `/api/user`
app.use("/api/auth", authRoutes); // Use routes for `/api/auth`
app.use("/api/post", postRoures); // Use routes for `/api/post`
app.use("/api/comment", commentRoutes);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// //Add error handling AFTER all routes
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something went wrong!");
// });
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
