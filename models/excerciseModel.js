const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const exerciseSchema = new mongoose.Schema({
  exercisename: {
    type: String,
    required: [true, 'Please enter exercise name'],
    unique: true,
    trim: true,
  },
  exercisedescription: {
    type: String,
    required: [true, 'Please enter exercise description'],
    trim: true,
  },
  exerciseimage: {
    type: String,
    required: [true, 'Please enter exercise image URL'],
    trim: true,
  },
  exercisetype: {
    type: String,
    enum: ['push', 'pull', 'leg', 'free'],
    required: [true, 'Please select exercise type'],
  },
});

exerciseSchema.plugin(mongoosePaginate);

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
