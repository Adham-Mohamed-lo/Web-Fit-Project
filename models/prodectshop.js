const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: double,
    required: true,
  },
  id: {
    type: int,
    required: true,
  },
  // Add more fields as needed
});

const User = mongoose.model("product", productSchema);

module.exports = User;