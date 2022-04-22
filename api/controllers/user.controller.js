import { User } from "../models/index.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register a new user
export const register = async (req, res) => {
  const { email, password } = req.body;
  const user_exist = await User.find({ email });
  const characters = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Email and password validations
  if (user_exist.length !== 0) {
    console.log("Your password is already in use");
    throw new Error();
  } else if (!characters.test(password)) {
    console.log(
      "Your password must include at least one lowercase letter, one uppercase letter, one number, and one symbol. Your password must be at least 8 characters"
    );
    throw new Error();
  }

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ ...req.body, password: hash });
  try {
    const user = await newUser.save();
    console.log(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send();
  }
};

// login user
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

// get all users in the platform
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
