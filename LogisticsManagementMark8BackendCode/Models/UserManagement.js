const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserManagement = mongoose.model("UserManagement", userSchema);

module.exports = UserManagement;
