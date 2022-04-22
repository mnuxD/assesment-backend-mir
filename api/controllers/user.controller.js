import { User } from "../models/index.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const password = req.body.password;
  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({ ...req.body, password: hash });
  try {
    const user = await newUser.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }

  console.log({ ...req.body, password: hash });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });
  const userDB = user[0];
  if (user.length === 0) res.status(403).send();
  console.log(user);
  //Validate Hash
  bcrypt.compare(password, userDB.password, (err, isPassValid) => {
    if (email === userDB.email && isPassValid) {
      //JWT
      jwt.sign(
        { email: userDB.email },
        process.env.SECRET_KEY,
        (error, token) => {
          if (!error) {
            res.status(200).json({
              token,
            });
          } else {
            res.status(403).send();
          }
        }
      );
    } else {
      res.status(403).send();
    }
  });
};

export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users.length === 0) response.status(204).send();
    response.status(200).json(users);
    console.log("users", users);
  } catch (e) {
    response.status(500).json({ error: e });
  }
};
