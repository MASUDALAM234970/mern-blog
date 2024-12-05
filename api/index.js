import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js"; // Correct route import

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

app.use("/api/user", UserRoutes); // Use routes for `/api`

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

// Add error handling AFTER all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
