const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  img:{
    type: String,
    required: true, 
  }
  // Add more fields as needed
});

const User = mongoose.model("product", productSchema);

module.exports = User;