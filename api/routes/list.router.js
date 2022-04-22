import express from "express";

import { listController } from "../controllers/index.js";
const { createList, getAllLists, getListByUser, getOneList, deleteList } =
  listController;

const router = express.Router();

const listRoutes = {
  CREATE_LIST: "/favs",
  GET_ALL: "/favs",
  GET_BY_USER: "/favs/user/:userID",
  GET_ONE_LIST: "/favs/:id",
  DELETE_ONE_LIST: "/favs/:id",
};

router.post(listRoutes.CREATE_LIST, createList);
router.get(listRoutes.GET_ALL, getAllLists);
router.get(listRoutes.GET_BY_USER, getListByUser);
router.get(listRoutes.GET_ONE_LIST, getOneList);
router.delete(listRoutes.DELETE_ONE_LIST, deleteList);

export default router;
