import mongoose from "mongoose";

// Schema users
const schemaUsers = {
  email: String,
  password: String,
};

// User model
const User = mongoose.model("User", schemaUsers, "user");

export default User;
