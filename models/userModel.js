// user.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    type: String,  // Storing as string
    required: true,
  },
  userphone: {
    type: String,  // Storing as string
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

// Pre-save hook to hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('userpassword')) {
    this.userpassword = await bcrypt.hash(this.userpassword, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
