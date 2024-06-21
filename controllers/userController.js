const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Product = require('../models/prodectshopModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');



const displayAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.render("displayusers", {
            users,
            currentPage: "display",
            user: req.session.user || null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// POST route to create a new user
const postSignup = async (req, res) => {
    const {
        fullname,
        username,
        userpassword,
        userphone,
        useremail,
        role,
        gender,
        age,
        address,
        img,
        Subscription,
    } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { useremail }, { userphone }] });
        if (existingUser) {
            return res.redirect("/auth/signup");
            //res.status(400).json({ error: "User with this username, email, or phone number already exists" });
        }

        // Create a new user instance
        const newUser = new User({
            fullname,
            username,
            userpassword,
            userphone,
            useremail,
            role,
            gender,
            age,
            address,
            img,
            Subscription,
        });

        await newUser.save();

        res.redirect("/auth/login");
    } catch (err) {
        console.error(err);
        //res.redirect("/auth/login#signup-container");
        res.status(500).json({ error: "Failed to register user" });
    }

};

const updateUser = async (userId, updateData, res) => {
    try {
        // Hash the password if it is being updated
        if (updateData.userpassword) {
            const salt = await bcrypt.genSalt(10);
            updateData.userpassword = await bcrypt.hash(updateData.userpassword, salt);
        }

        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

const deleteUser = async (userId, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};



const updateCart = async (req, res) => {
    const userId = req.session.user._id;
    const { productId, quantity } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the product exists
        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Check if the product is already in the cart
        const cartItemIndex = user.cart.findIndex(item => item.productId === productId);

        if (cartItemIndex > -1) {
            // If product is already in cart, update the quantity
            if (quantity > 0) {
                user.cart[cartItemIndex].quantity = quantity;
            } else {
                // Remove item from cart if quantity is 0
                user.cart.splice(cartItemIndex, 1);
            }
        } else if (quantity > 0) {
            // If product is not in cart and quantity is more than 0, add new cart item
            user.cart.push({ productId, quantity });
        }

        // Save the user with updated cart
        await user.save();

        res.status(200).send('Cart updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
const getCart = async (req, res) => {
    const userId = req.session.user._id;

    try {   
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const cartWithDetails = await Promise.all(user.cart.map(async (item) => {
            const product = await Product.findOne({ id: item.productId });
            return {
                product,
                quantity: item.quantity
            };
        }));

        res.status(200).json(cartWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};




module.exports = {
    displayAllUsers, updateUser, postSignup, deleteUser, updateCart, getCart,
};





