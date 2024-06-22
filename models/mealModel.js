const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const mealSchema = new mongoose.Schema({
  mealname: {
    type: String,
    required: true,
    unique: true,
  },
  mealdescription: {
    type: String,
    required: true,
    unique: true,
  },
  // Add more fields as needed
});

// Add pagination plugin to the schema
mealSchema.plugin(mongoosePaginate);

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
