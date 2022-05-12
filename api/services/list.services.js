import { response } from "express";
import { List } from "../models/index.js";

export const create = async (data) => {
  const { userID } = data;
  const exist_list = await List.find({ userID });
  if (exist_list.length === 0) {
    const list = new List(data);
    const newList = await list.save();
    return newList;
  } else {
    console.log("This user already has a list");
    throw new Error();
  }
};

export const allLists = async () => {
  const lists = await List.find();
  return lists;
};

export const oneList = async (id) => {
  const list = await List.findById(id);
  return list;
};

export const oneListByUser = async (userID) => {
  const list = await List.findOne({ userID });
  return list;
};

export const deleteOneList = async (id) => {
  const listToDelete = await List.findById(id);
  if (listToDelete) {
    const deletedList = await List.deleteOne(listToDelete);
    return deletedList;
  }
  return false;
};

export const updateOneList = async (id, item) => {
  if (!item.title || !item.description || !item.link) throw new Error();
  const list = await List.findById(id).lean();
  const listToUpdate = await List.findById(id).lean();
  if (!list) throw new Error();
  listToUpdate.list.push(item);
  await List.updateOne(list, listToUpdate);
  return listToUpdate;
};
