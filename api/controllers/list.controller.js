import { List } from "../models/index.js";
import { listServices } from "../services/index.js";

const {
  create,
  allLists,
  oneList,
  oneListByUser,
  deleteOneList,
  updateOneList,
} = listServices;

// Create list to one user
export const createList = async (req, res) => {
  try {
    const newList = await create(req.body);
    newList && res.status(201).json(newList);
  } catch (e) {
    res.status(500).send();
  }
};

// Get all lists of all users
export const getAllLists = async (req, res) => {
  try {
    const lists = await allLists();
    if (lists.length === 0) res.status(204).send();
    res.status(200).json(lists);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

//Get one list by its id
export const getOneList = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await oneList(id);
    if (!list) res.status(204).send();
    else res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// get one list by id's user
export const getListByUser = async (req, res) => {
  try {
    const { userID } = req.params;

    const list = await oneListByUser(userID);
    if (!list) res.status(204).send();
    else res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// delete one list by its id
export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await deleteOneList(id);
    if (!deletedList) res.status(204).json({ error: "No list to delete" });
    else res.status(200).json(deletedList);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//add items into a list by its id
export const addItemsToList = async (req, res) => {
  try {
    const { id } = req.params;
    const items = req.body;
    const updatedList = await updateOneList(id, items);
    if (!updatedList) throw new Error();
    else res.status(200).json(updatedList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
