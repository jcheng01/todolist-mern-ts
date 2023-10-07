import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // package to encrypt the password sent to api
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10); //syntax for encrypting
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json("User created");
  } catch (error) {
    next(error);
  }
};
