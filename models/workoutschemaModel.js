const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const workoutSchema = new mongoose.Schema({
  workoutname: {
    type: String,
    required: true,
    unique: true,
  },
  workoutdescription: {
    type: String,
    required: true,
    unique: true,
  },
  workoutgif: {
    type: String,
    required: true,
    unique: true,
  },
});

workoutSchema.plugin(mongoosePaginate);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
