import { userServices } from "../services/index.js";

const { isValid, create, allUsers } = userServices;

//register a new user
export const register = async (req, res) => {
  try {
    await isValid(req.body);
    const user = await create(req.body);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send();
  }
};

// get all users in the platform
export const getAllUsers = async (req, res) => {
  try {
    const users = await allUsers();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
