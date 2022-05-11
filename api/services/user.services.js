import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

export const isValid = async ({ email, password }) => {
  const user_exist = await User.find({ email });
  if (user_exist.length !== 0) {
    console.log("Your email is already in use");
    throw new Error();
  } else if (password.split("").length < 7) {
    console.log("Your password must be at least 8 characters");
    throw new Error();
  }
};

export const create = async (data) => {
  const hash = await bcrypt.hash(data.password, 10);
  const newUser = new User({ ...data, password: hash });
  const user = await newUser.save();
  return user;
};

export const allUsers = async () => {
  const users = await User.find();
  if (users.length === 0) throw new Error();
  else return users;
};
