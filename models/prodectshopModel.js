const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: [true, "please enter product name"],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    trim: true,
  },
  id: {
    type: Number,
    required: [true, "please enter product ID"],
    trim: true,
    unique: true,
  },
  img: {
    type: String,
    required: [true, "please enter product image"],
    unique: true,
    trim: true,
  }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
