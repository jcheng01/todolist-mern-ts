import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // package to encrypt the password sent to api
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); //the method to find if it exists in mongoose
    if (!validUser) return next(errorHandler(404, "User not found."));
    const validPassword = bcryptjs.compareSync(password, validUser.password); //returns boolean if passwords match
    if (!validPassword) return next(errorHandler(401, "Wrond Credential."));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); // handles auth process by encoding user details and generating token to access routes for auth
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
