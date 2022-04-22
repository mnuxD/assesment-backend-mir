import mongoose from "mongoose";

// Schema lists
const schemaLists = {
  name: String,
  userID: String,
  list: Array,
};

// List model
const List = mongoose.model("List", schemaLists, "list");

export default List;
