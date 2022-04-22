import express from "express";

import { userController } from "../controllers/index.js";
const { login, register, getAllUsers } = userController;

const router = express.Router();

const userRoutes = {
  LOGIN: "/local/login",
  REGISTER: "/local/register",
  GET_ALL: "/local/users",
};

router.post(userRoutes.LOGIN, login);
router.post(userRoutes.REGISTER, register);
router.get(userRoutes.GET_ALL, getAllUsers);

export default router;
