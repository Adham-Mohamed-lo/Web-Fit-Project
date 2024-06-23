const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Product = require('../models/prodectshopModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


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

const userstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const userupload = multer({ storage: userstorage });

const postSignup = (req, res) => {
    userupload.single('img')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).send('Error uploading image.');
        } else if (err) {
            return res.status(500).send('Unknown error occurred.');
        }

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
            Subscription,
        } = req.body;

        const img = req.file ? `/images/users/${req.file.filename}` : null; // Get the relative path of the uploaded image

        try {
            const existingUser = await User.findOne({ $or: [{ username }, { useremail }, { userphone }] });
            if (existingUser) {
                if (img) {
                    fs.unlink(path.join('public', img), (err) => {
                        if (err) console.error("Failed to remove uploaded image:", err);
                    });
                }
                return res.redirect("/auth/signup");
            }

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
            console.error("Error saving user:", err);
            if (img) {
                fs.unlink(path.join('public', img), (err) => {
                    if (err) console.error("Failed to remove uploaded image:", err);
                });
            }
            res.status(500).send("Error saving user");
        }
    });
};

// const updateUser = async (req, res) => {
//     userupload.single('img')(req, res, async (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).send('Error uploading image.');
//         } else if (err) {
//             return res.status(500).send('Unknown error occurred.');
//         }

//         const userId = req.params.userId; // Assuming userId is passed as a route parameter
//         const updateData = req.body;

//         if (req.file) {
//             const newImgPath = `/images/users/${req.file.filename}`;

//             try {
//                 // Get the existing user to remove the old image
//                 const existingUser = await User.findById(userId);
//                 if (existingUser && existingUser.img) {
//                     fs.unlink(path.join('public', existingUser.img), (err) => {
//                         if (err) console.error("Failed to remove old image:", err);
//                     });
//                 }

//                 // Update the image path in updateData
//                 updateData.img = newImgPath;
//             } catch (err) {
//                 return res.status(500).json({ error: "Failed to update user image" });
//             }
//         }

//         try {
//             // Hash the password if it is being updated
//             if (updateData.userpassword) {
//                 const salt = await bcrypt.genSalt(10);
//                 updateData.userpassword = await bcrypt.hash(updateData.userpassword, salt);
//             }

//             // Update user in the database
//             const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

//             if (!updatedUser) {
//                 return res.status(404).json({ error: "User not found" });
//             }

//             res.status(200).json({ message: "User updated successfully", user: updatedUser });
//         } catch (err) {
//             res.status(500).json({ error: "Failed to update user" });
//         }
//     });
// };

// const deleteUser = async (req, res) => {
//     const userId = req.params.userId; // Assuming userId is passed as a route parameter

//     try {
//         const userToDelete = await User.findByIdAndDelete(userId);

//         if (!userToDelete) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Remove the user's image if it exists
//         if (userToDelete.img) {
//             fs.unlink(path.join('public', userToDelete.img), (err) => {
//                 if (err) console.error("Failed to remove user image:", err);
//             });
//         }

//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (err) {
//         res.status(500).json({ error: "Failed to delete user" });
//     }
// };



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

async function addCardToUser(userId, cardDetails) {
    const { selectedCard, cardholdername, frontcardnumber, cvv, expiremonth, expireyear } = cardDetails;
    const errors = [];

    if (!selectedCard|| selectedCard === 'new') {
        if (!cardholdername || !frontcardnumber || !cvv || !expiremonth || !expireyear) {
            errors.push("All fields are required!");
        } else {
            if (!/^\d{16}$/.test(frontcardnumber)) {
                errors.push("Invalid card number!");
            }
            if (!/^[a-zA-Z\s]+$/.test(cardholdername) || cardholdername.trim() === "") {
                errors.push("Invalid card holder name!");
            }
            if (expiremonth === "month") {
                errors.push("Please select expiration month!");
            }
            if (expireyear === "year") {
                errors.push("Please select expiration year!");
            }
            if (!/^\d{3,4}$/.test(cvv)) {
                errors.push("Invalid CVV!");
            }
        }

        if (errors.length > 0) {
            throw new Error(errors.join("\n"));
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedCardNumber = await bcrypt.hash(frontcardnumber, salt);
        const encryptedCVV = await bcrypt.hash(cvv, salt);

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.visa) {
            user.visa = [];
        }

        const last4digits = frontcardnumber.slice(-4);
        const newVisa = {
            cardholdername,
            frontcardnumber: encryptedCardNumber,
            cvv: encryptedCVV,
            expiredate: `${expiremonth}/${expireyear}`,
            last4digits: last4digits
        };

        user.visa.push(newVisa);

        await user.save();
    } else {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const card = user.visa.id(selectedCard);
        if (!card) {
            throw new Error('Selected card not found');
        }
    }
}







module.exports = {
    displayAllUsers, postSignup, updateCart, getCart,addCardToUser,
};





