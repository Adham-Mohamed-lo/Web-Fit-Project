// user.js
const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema({

  cardholdername: {
    type: String,
    required: true,
    unique: true,
  },
  frontcardnumber: {
    type: int,
    required: true,
    unique: true,
  },
  cvv: {
    type: int,
    required: true,
    unique: true,
  
  expiredate: {
    type: int,
    required: true,
    
  },
  
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

module.exports = User;
