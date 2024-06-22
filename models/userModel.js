const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require('mongoose-paginate-v2');


//mongoosePaginate = require('mongoose-paginate-v2') lesa l 7war dah fy l routes !!
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
  },
  userpassword: {
    type: String,
    required: [true, 'Password is required'],
  },
  userphone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
  },
  useremail: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'coach'],
    default: 'user',
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: false,
  },
  Subscription: {
    type: String,
    enum: ['Free Plan', 'Standard Plan', 'Premium Plan'],
    default: 'Free Plan',
    required: true,
  },
  cart: [cartItemSchema],
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('save', async function(next) {
  if (this.isModified('userpassword')) {
    try {
      const pas = await bcrypt.genSalt(10);
      this.userpassword = await bcrypt.hash(this.userpassword, pas);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
