import express from "express";

import { listController } from "../controllers/index.js";
import { isAuthenticated } from "../middlewares/index.js";

const {
  createList,
  getAllLists,
  getListByUser,
  getOneList,
  deleteList,
  addItemsToList,
} = listController;

const router = express.Router();

const listRoutes = {
  CREATE_LIST: "/favs",
  GET_ALL: "/favs",
  GET_BY_USER: "/favs/user/:userID",
  GET_ONE_LIST: "/favs/:id",
  DELETE_ONE_LIST: "/favs/:id",
  ADD_ITEMS: "/favs/additems/:id",
};

router.post(listRoutes.CREATE_LIST, isAuthenticated, createList);
router.get(listRoutes.GET_ALL, isAuthenticated, getAllLists);
router.get(listRoutes.GET_BY_USER, isAuthenticated, getListByUser);
router.get(listRoutes.GET_ONE_LIST, isAuthenticated, getOneList);
router.delete(listRoutes.DELETE_ONE_LIST, isAuthenticated, deleteList);
router.put(listRoutes.ADD_ITEMS, isAuthenticated, addItemsToList);

export default router;
