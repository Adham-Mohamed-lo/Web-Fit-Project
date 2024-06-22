const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  quantity: {
    type: String,
    required: true,
    trim: true, 
  }
});


const mealSchema = new mongoose.Schema({
  mealname: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
  },
  mealdescription: {
    type: String,
    required: true,
    trim: true, 
    unique: false,
  },
  ingredients: [ingredientSchema]
});


mealSchema.plugin(mongoosePaginate);


const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
