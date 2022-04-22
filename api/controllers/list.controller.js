import { List } from "../models/index.js";

// Create list to one user
export const createList = async (req, res) => {
  const { userID } = req.body;
  const exist_list = await List.find({ userID });
  try {
    // Each user can have a unique list of favs
    if (exist_list.length !== 0) {
      console.log("This user already has a list");
      throw new Error();
    }
    const list = new List(req.body);
    const newList = await list.save();
    newList && res.status(201).json(newList);
  } catch (e) {
    res.status(500).send();
  }
};

// Get all lists of all users
export const getAllLists = async (request, response) => {
  try {
    const lists = await List.find();
    if (lists.length === 0) response.status(204).send();
    response.status(200).json(lists);
  } catch (e) {
    response.status(500).json({ error: e });
  }
};

//Get one list by its id
export const getOneList = async (request, response) => {
  try {
    const { id: listID } = request.params;

    const list = await List.findById(listID);
    if (!list) response.status(204).send();
    response.status(200).json(list);
  } catch (e) {
    response.status(500).json({ error: e });
  }
};

// get one list by id's user
export const getListByUser = async (request, response) => {
  try {
    const { userID: userID } = request.params;

    const list = await List.find({ userID });
    if (!list) response.status(204).send();
    response.status(200).json(list);
  } catch (e) {
    response.status(500).json({ error: e });
  }
};

// delete one list by its id
export const deleteList = async (req, res) => {
  const { id: listID } = req.params;
  try {
    const listToDelete = await List.findById(listID);
    if (!listToDelete) res.status(204).json({ error: "No list to delete" });
    const deletedList = await List.deleteOne(listToDelete);
    if (deletedList) res.status(200).json(deletedList);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//add items into a list by its id
export const addItemsToList = async (req, res) => {
  const { id: listID } = req.params;
  const moreItems = req.body;
  const list = await List.findById(listID).lean();
  const listToUpdate = { ...list };
  const newList = listToUpdate.list.concat(moreItems);
  listToUpdate.list = newList;

  try {
    List.updateOne(list, listToUpdate, (error, updatedList) => {
      if (!error) {
        res.status(200).json(updatedList);
      } else res.status(500).send(error);
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
