const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: [true, "please enter product name"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
  },
  id: {
    type: Number,
    required: [true, "please enter product ID"],
    unique: true,
  },
  img:{
    type: String,
    required: [true, "please enter product image"],
    unique: true,
  }


  // Add more fields as needed
});

const User = mongoose.model("product", productSchema);

module.exports = User;