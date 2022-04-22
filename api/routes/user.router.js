import express from "express";

import { userController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/index.js";

const { login, register, getAllUsers } = userController;

const router = express.Router();

const userRoutes = {
  LOGIN: "/local/login",
  REGISTER: "/local/register",
  GET_ALL: "/local/users",
};

router.post(userRoutes.LOGIN, login);
router.post(userRoutes.REGISTER, register);
router.get(userRoutes.GET_ALL, isAuthenticated, getAllUsers);

export default router;
