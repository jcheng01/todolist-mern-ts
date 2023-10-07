import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // package to encrypt the password sent to api

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10); //syntax for encrypting
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json("User created");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
