import { authServices } from "../services/index.js";

const { logIn } = authServices;

// login user
export const login = async (req, res) => {
  try {
    const token = await logIn(req.body);
    console.log("hola", token);
    if (token) res.status(200).json({ token });
    else throw new Error();
  } catch (error) {
    res.status(403).send();
  }
};
