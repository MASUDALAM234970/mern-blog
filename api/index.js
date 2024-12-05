import express from "express";
import mongoose from "mongoose"; // Correct the typo here
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongoose is a connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  }); // Add error handling for the database connection

const app = express();

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
