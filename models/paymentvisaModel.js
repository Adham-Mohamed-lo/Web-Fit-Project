const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
});

visaSchema.plugin(mongoosePaginate);

const Visa = mongoose.model("Payment", visaSchema);
module.exports = Visa;
