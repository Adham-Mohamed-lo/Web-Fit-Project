const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const exerciseSchema = new mongoose.Schema({
  exercisename: {
    type: String,
    required: [true, 'Please enter exercise name'],
    unique: true,
  },
  exercisedescription: {
    type: String,
    required: [true, 'Please enter exercise description'],
  },
  exerciseimage: {
    type: String,
    required: [true, 'Please enter exercise image URL'],
  },
});

exerciseSchema.plugin(mongoosePaginate);

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
