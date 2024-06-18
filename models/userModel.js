// user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userpassword: {
    type: int,
    required: true,
    unique: true,
  },
  userphone: {
    type: int,
    required: true,
    unique: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  // Add more fields as needed
});
const User = mongoose.model("User", userSchema);

module.exports = User;
