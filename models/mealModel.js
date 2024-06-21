const mongoose = require("mongoose");

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

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;