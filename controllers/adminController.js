const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const multer = require('multer');
const Coach = require("../models/coachesModel.js");
const Product = require("../models/prodectshopModel.js");
const Meal = require("../models/mealModel.js");
const Exercise = require("../models/excerciseModel.js");
const User = require("../models/userModel.js");

// Multer storage configuration
const coachstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/coaches');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const coachupload = multer({ storage: coachstorage });

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const productUpload = multer({ storage: productStorage });

// Helper function to send consistent error responses
const sendErrorResponse = (res, message, status = 500) => {
    res.status(status).json({ error: message });
};

// Product Handlers
const getAllProducts = (req, res) => {
    Product.find()
        .then((products) => {
            res.render('shop', { products });
        })
        .catch((err) => {
            console.error(err);
            sendErrorResponse(res, 'Error fetching products');
        });
};

const addProduct = (req, res) => {
    productUpload.single('productImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return sendErrorResponse(res, 'Error uploading image.');
        } else if (err) {
            return sendErrorResponse(res, 'Unknown error occurred.');
        }

        const { productName, productPrice, productId } = req.body;
        const productImage = req.file;

        if (!productImage) {
            return sendErrorResponse(res, 'No image uploaded.', 400);
        }

        const newProduct = new Product({
            productname: productName,
            price: productPrice,
            id: productId,
            img: `/images/products/${productImage.filename}`
        });

        newProduct.save()
            .then(() => {
                res.json({ message: 'Product added successfully.' });
            })
            .catch((err) => {
                console.error("Error saving product:", err);
                fs.unlink(path.join(__dirname, '..', 'public', `/images/products/${productImage.filename}`), (err) => {
                    if (err) console.error("Failed to remove uploaded image:", err);
                });
                sendErrorResponse(res, "Error saving product");
            });
    });
};

const deleteProduct = (req, res) => {
    const { removeProductName, removeProductId } = req.body;

    Product.findOneAndDelete({ productname: removeProductName, id: removeProductId })
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return sendErrorResponse(res, 'Product not found.', 404);
            }
            res.json({ message: 'Product removed successfully.' });
        })
        .catch((err) => {
            console.error("Error deleting product:", err);
            sendErrorResponse(res, "Error deleting product");
        });
};

const editProduct = (req, res) => {
    const { editProductName, newProductName, productId, productPrice } = req.body;

    Product.findOne({ productname: editProductName })
        .then((existingProduct) => {
            if (!existingProduct) {
                return sendErrorResponse(res, 'Product not found.', 404);
            }

            existingProduct.productname = newProductName;
            existingProduct.price = productPrice;
            existingProduct.id = productId;

            return existingProduct.save();
        })
        .then(() => {
            res.json({ message: 'Product updated successfully.' });
        })
        .catch((err) => {
            console.error("Error updating product:", err);
            sendErrorResponse(res, "Error updating product");
        });
};

// Coach Handlers
const addCoach = (req, res) => {
    coachupload.single('coachimage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return sendErrorResponse(res, 'Error uploading image.');
        } else if (err) {
            return sendErrorResponse(res, 'Unknown error occurred.');
        }

        const { coachname, coachdescription } = req.body;
        const coachimage = req.file;

        if (!coachimage) {
            return sendErrorResponse(res, 'No image uploaded.', 400);
        }

        const newCoach = new Coach({
            coachname,
            coachdescription,
            coachimage: `/images/coaches/${coachimage.filename}`
        });

        newCoach.save()
            .then(() => {
                res.json({ message: 'Coach added successfully.' });
            })
            .catch((err) => {
                console.error(err);
                fs.unlink(path.join(__dirname, '..', 'public', `/images/coaches/${coachimage.filename}`), (err) => {
                    if (err) console.error("Failed to remove uploaded image:", err);
                });
                sendErrorResponse(res, "Error saving coach");
            });
    });
};

const removeCoach = (req, res) => {
    const { removeCoachName } = req.body;

    if (!removeCoachName) {
        return sendErrorResponse(res, 'Coach name is required.', 400);
    }

    Coach.findOneAndDelete({ coachname: removeCoachName })
        .then((coach) => {
            if (!coach) {
                return sendErrorResponse(res, 'Coach not found.', 404);
            }
            res.json({ message: 'Coach removed successfully.' });
        })
        .catch((err) => {
            console.error(err);
            sendErrorResponse(res, 'Error removing coach.');
        });
};

const editCoach = (req, res) => {
    const { editCoachName, newCoachName, coachDescription } = req.body;

    Coach.findOne({ coachname: editCoachName })
        .then((existingCoach) => {
            if (!existingCoach) {
                return sendErrorResponse(res, 'Coach not found.', 404);
            }

            existingCoach.coachname = newCoachName;
            existingCoach.description = coachDescription;

            return existingCoach.save();
        })
        .then(() => {
            res.json({ message: 'Coach updated successfully.' });
        })
        .catch((err) => {
            console.error("Error updating coach:", err);
            sendErrorResponse(res, "Error updating coach");
        });
};

// Fetch Coaches
const getCoaches = (req, res) => {
    Coach.find()
        .then(coaches => {
            res.render('coaches', { coaches });
        })
        .catch(err => {
            console.error(err);
            sendErrorResponse(res, "Error retrieving coaches");
        });
};

// Meal Handlers
const addmeal = async (req, res) => {
    const { mealname, mealdescription, ingredients } = req.body;

    if (!mealname || !mealdescription) {
        return sendErrorResponse(res, 'Meal name and description are required.', 400);
    }

    const newMeal = new Meal({
        mealname,
        mealdescription,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients]
    });

    try {
        await newMeal.save();
        res.json({ message: 'Meal added successfully.' });
    } catch (err) {
        console.error("Error saving meal:", err);
        sendErrorResponse(res, "Error saving meal");
    }
};

const deleteMeal = async (req, res) => {
    const { removeMealName } = req.body;

    try {
        const deletedMeal = await Meal.findOneAndDelete({ mealname: removeMealName });
        if (!deletedMeal) {
            return sendErrorResponse(res, 'Meal not found.', 404);
        }
        res.json({ message: 'Meal successfully deleted.' });
    } catch (err) {
        console.error("Error deleting meal:", err);
        sendErrorResponse(res, "Error deleting meal");
    }
};

const editMeal = async (req, res) => {
    const { editMealName, newMealName, newMealdescription, newIngredients } = req.body;
    try {
        const existingMeal = await Meal.findOne({ mealname: editMealName });
        if (!existingMeal) {
            return sendErrorResponse(res, 'Meal not found.', 404);
        }

        existingMeal.mealname = newMealName;
        existingMeal.mealdescription = newMealdescription;
        existingMeal.ingredients = newIngredients.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity
        }));

        await existingMeal.save();
        res.json({ message: 'Meal successfully updated.' });
    } catch (err) {
        console.error("Error updating meal:", err);
        sendErrorResponse(res, "Error updating meal");
    }
};

// Exercise Handlers
const addExercise = async (req, res) => {
    const { Exercisename, Exercisedescription, Exerciseimage, Exercisetype } = req.body;

    if (!Exercisename || !Exercisedescription || !Exerciseimage || !Exercisetype) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newExercise = new Exercise({
        exercisename: Exercisename,
        exercisedescription: Exercisedescription,
        exerciseimage: Exerciseimage, // Assuming Exerciseimage is a URL string
        exercisetype: Exercisetype
    });

    try {
        await newExercise.save();
        res.json({ message: 'Exercise added successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error saving exercise.' });
    }
};


const removeExercise = (req, res) => {
    const { removeExerciseName } = req.body;

    if (!removeExerciseName) {
        return sendErrorResponse(res, 'Exercise Name is required.', 400);
    }

    Exercise.findOneAndDelete({ exercisename: removeExerciseName })
        .then((exercise) => {
            if (!exercise) {
                return sendErrorResponse(res, 'Exercise not found.', 404);
            }
            res.json({ message: 'Exercise removed successfully.' });
        })
        .catch((err) => {
            console.error(err);
            sendErrorResponse(res, 'Error removing exercise.');
        });
};

const editExercise = (req, res) => {
    const { editExerciseName, newExerciseName, exercisedescription, exerciseimage, Exercisetype } = req.body;

    if (!editExerciseName || !newExerciseName || !exercisedescription || !exerciseimage || !Exercisetype) {
        return sendErrorResponse(res, 'All fields are required.', 400);
    }

    Exercise.findOneAndUpdate(
        { exercisename: editExerciseName },
        {
            exercisename: newExerciseName,
            exercisedescription: exercisedescription,
            exerciseimage: exerciseimage,
            exercisetype: Exercisetype
        },
        { new: true }
    )
    .then((exercise) => {
        if (!exercise) {
            return sendErrorResponse(res, 'Exercise not found.', 404);
        }
        res.json({ message: 'Exercise updated successfully.' });
    })
    .catch((err) => {
        console.error(err);
        sendErrorResponse(res, 'Error updating exercise.');
    });
};

// User Handlers
const getAllUsers = (req, res) => {
    User.find()
        .then((users) => {
            res.render('viewuser', { users });
        })
        .catch((err) => {
            console.error(err);
            sendErrorResponse(res, 'Error fetching users');
        });
};

const getDashboardData = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const mealCount = await Meal.countDocuments();
        const coachCount = await Coach.countDocuments();
        const mostPurchasedProduct = await Product.find().sort({ purchases: -1 }).limit(1);

        res.render('dashboard', {
            userCount,
            mealCount,
            coachCount,
            mostPurchasedProduct: mostPurchasedProduct[0]
        });
    } catch (err) {
        console.error(err);
        sendErrorResponse(res, 'Error fetching dashboard data');
    }
};

module.exports = {
    getAllProducts, addCoach, addmeal, deleteMeal, editMeal, addProduct, deleteProduct, getCoaches, editProduct, removeCoach, addExercise, editCoach, removeExercise, editExercise, getAllUsers, getDashboardData
};
