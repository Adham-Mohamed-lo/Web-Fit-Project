const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for the user cart items
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String, // Assuming product IDs are MongoDB ObjectIDs
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

// Define the main user schema with the cart field
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
    required: false, // Optional field, can be adjusted as needed
  },
  Subscription: {
    type: String,
    enum: ['Free Plan', 'Standard Plan', 'Premium Plan'],
    default: 'Free Plan', 
    required: true,
  },
  cart: [cartItemSchema], // Embed the cart items as a subdocument array
});

// Pre-save hook to hash password before saving
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
