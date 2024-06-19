const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema({

  cardholdername: {
    type: String,
    required: true,
    unique: true,
  },
  frontcardnumber: {
    type: Number,
    required: true,
    unique: true,
  },
  cvv: {
    type: Number,
    required: true,
    unique: true,
  },
  expiredate: {
    type: Number,
    required: true,
    
  },
  
  // Add more fields as needed
});

const User = mongoose.model("payment", visaSchema);

module.exports = User;
