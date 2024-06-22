const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
  img: {
    type: String,
    required: [true, "please enter product image"],
    unique: true,
  }
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
