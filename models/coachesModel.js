const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const coachSchema = new mongoose.Schema({
  coachname: {
    type: String,
    required: [true, "please enter coach name"],
    unique: true,
    trim: true,
  },
  coachdescription: {
    type: String,
    required: [true, "please enter coach description"],
    trim: true,
  },
  coachimage: {
    type: String,
    required: [true, "please enter coach image"],
    unique: true,
    trim: true,
  },
});

coachSchema.plugin(mongoosePaginate);

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;
