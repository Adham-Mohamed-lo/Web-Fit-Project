const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  mealnumber: {
    type: int,
    required: true,
    unique: true,
  },
  mealdescription: {
    type: string,
    required: true,
    unique: true,
  },
  // Add more fields as needed
});

const User = mongoose.model("meal", mealSchema);
