const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const coachSchema = new mongoose.Schema({
  coachname: {
    type: String,
    required: [true, "please enter coach name"],
    unique: true,
  },
  coachdescription: {
    type: String,
    required: [true, "please enter coach description"],
  },
  coachimage: {
    type: String,
    required: [true, "please enter coach image"],
    unique: true,
  },
});

coachSchema.plugin(mongoosePaginate);

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;
