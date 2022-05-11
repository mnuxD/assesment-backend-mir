import express from "express";

import { authController } from "../controllers/index.js";

const { login } = authController;

const router = express.Router();

const authRoutes = {
  LOGIN: "/local/login",
};

router.post(authRoutes.LOGIN, login);

export default router;
