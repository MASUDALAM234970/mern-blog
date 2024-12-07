import e from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    email == "" ||
    password == ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
  });

  try {
    await newUser.save();
    console.log(req.body); // Log the request body for debugging
    res.status(200).json({ message: "Hey Dear Signup successful !" });
  } catch (error) {
    // console.error("Error in signup:", error);
    //res.status(500).json({ error: "Something went wrong" + error.message });
    next(error);
  }
};
