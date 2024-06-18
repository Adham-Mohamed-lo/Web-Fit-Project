const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminname: {
    type: String,
    required: true,
    unique: true,
  },
  adminusername: {
    type: String,
    required: true,
    unique: true,
  },
  adminpassword: {
    type: int,
    required: true,
    unique: true,
  },
  adminphone: {
    type: int,
    required: true,
    unique: true,
  },
  adminemail: {
    type: String,
    required: true,
    unique: true,
  },
  // Add more fields as needed
});

const User = mongoose.model("admin", adminSchema);
