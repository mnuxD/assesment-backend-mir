import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

const validPass = (password, passCript) => {
  return bcrypt.compare(password, passCript);
};

const token = (email) => {
  return jwt.sign({ email }, process.env.SECRET_KEY);
};

export const logIn = async ({ email, password }) => {
  const user = await User.find({ email });
  if (user.length === 0) throw new Error();
  const userDB = user[0];

  return (await validPass(password, userDB.password))
    ? token(userDB.email)
    : false;
};
