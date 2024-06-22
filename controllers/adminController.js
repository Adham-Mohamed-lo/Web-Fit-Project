const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');
const multer = require('multer');
const Coach = require("../models/coachesModel.js");
const Product = require("../models/prodectshopModel.js");
const Meal = require("../models/mealModel.js");
const Exercise = require("../models/excerciseModel.js");



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

const getAllProducts = (req, res) => {
    Product.find()
        .then((products) => {
            res.render('shop', { products });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching products');
        });
};


const addProduct = (req, res) => {
    productUpload.single('productImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).send('Error uploading image.');
        } else if (err) {
            return res.status(500).send('Unknown error occurred.');
        }

        const { productName, productPrice, productId } = req.body;
        const productImage = req.file;

        if (!productImage) {
            return res.status(400).send('No image uploaded.');
        }

        const newProduct = new Product({
            productname: productName,
            price: productPrice,
            id: productId,
            img: `/images/products/${productImage.filename}`
        });

        newProduct.save()
            .then(() => {
                res.redirect("/auth/Admin");
            })
            .catch((err) => {
                console.error("Error saving product:", err);
            fs.unlink(path.join(__dirname, '..', 'public', `/images/products/${productImage.filename}`), (err) => {
                if (err) console.error("Failed to remove uploaded image:", err);
            });
                res.status(500).send("Error saving product");
            });
    });
};

const deleteProduct = (req, res) => {
    const { removeProductName, removeProductId } = req.body;

    Product.findOneAndDelete({ productname: removeProductName, id: removeProductId })
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return res.status(404).send('Product not found.');
            }

            const imagePath = path.join(__dirname, '..', 'public', deletedProduct.img);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error deleting product image.');
                }
                res.redirect("/auth/Admin");
            });
        })
        .catch((err) => {
            console.error("Error deleting product:", err);
            res.status(500).send("Error deleting product");
        });
};

const editProduct = (req, res) => {
    productUpload.single('productImage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).send('Error uploading image.');
        } else if (err) {
            return res.status(500).send('Unknown error occurred.');
        }

        const { editProductName, newProductName, productId, productPrice } = req.body;
        const productImage = req.file;

        Product.findOne({ productname: editProductName })
            .then((existingProduct) => {
                if (!existingProduct) {
                    return res.status(404).send('Product not found.');
                }

                if (productImage) {
                    const oldImagePath = path.join(__dirname, '..', 'public', existingProduct.img);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error deleting old product image.');
                        }
                    });
                    existingProduct.img = `/images/products/${productImage.filename}`;
                }

                existingProduct.productname = newProductName;
                existingProduct.price = productPrice;
                existingProduct.id = productId;

                return existingProduct.save();
            })
            .then(() => {
                res.redirect("/auth/Admin");
            })
            .catch((err) => {
                console.error("Error updating product:", err);
                if (productImage) {
                    fs.unlink(path.join(__dirname, '..', 'public', `/images/products/${productImage.filename}`), (err) => {
                        if (err) console.error("Failed to remove uploaded image:", err);
                    });
                }
                res.status(500).send("Error updating product");
            });
    });
};









const addCoach = (req, res) => {
    coachupload.single('coachimage')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).send('Error uploading image.');
        } else if (err) {
            return res.status(500).send('Unknown error occurred.');
        }

        const { coachname, coachdescription } = req.body;
        const coachimage = req.file;

        if (!coachimage) {
            return res.status(400).send('No image uploaded.');
        }

        const newCoach = new Coach({
            coachname,
            coachdescription,
            coachimage: `/images/coaches/${coachimage.filename}`
        });

        newCoach.save()
            .then(() => {
                res.redirect("/auth/Admin");
            })
            .catch((err) => {
                console.error(err);
            fs.unlink(path.join(__dirname, '..', 'public', `/images/coaches/${coachimage.filename}`), (err) => {
                if (err) console.error("Failed to remove uploaded image:", err);
            });
                res.status(500).send("Error saving coach");
            });
    });
};


const removeCoach = (req, res) => {
    console.log(req.body)
    const { removeCoachName } = req.body;
    console.log(removeCoachName)

    if (!removeCoachName) {
        return res.status(400).send('Coach name is required.');
    }
    Coach.findOne({ coachname: removeCoachName })
        .then((coach) => {
            if (!coach) {
                return res.status(404).send('Coach not found.');
            }

            // Coach found, now delete them
            Coach.findOneAndDelete({ coachname: removeCoachName })
                .then((deletedCoach) => {
                    // Optionally, delete the coach's image from the filesystem
                    if (deletedCoach.coachimage) {
                        const imagePath = path.join(__dirname, '..', 'public', deletedCoach.coachimage);
                        fs.unlinkSync(imagePath);
                    }

                    res.status(200).send('Coach removed successfully.');
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send('Error removing coach.');
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error removing coach.');
        });
};

const editCoach = (req, res) => {
    coachupload.single('coachImage')(req, res, (err) => {  // Updated here
        if (err instanceof multer.MulterError) {
            return res.status(500).send('Error uploading image.');
        } else if (err) {
            return res.status(500).send('Unknown error occurred.');
        }

        const { editCoachName, newCoachName, coachDescription } = req.body;
        const coachImage = req.file;

        Coach.findOne({ coachname: editCoachName })
            .then((existingCoach) => {
                if (!existingCoach) {
                    return res.status(404).send('Coach not found.');
                }

                if (coachImage) {
                    const oldImagePath = path.join(__dirname, '..', 'public', existingCoach.coachimage);
                    fs.unlink(oldImagePath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send('Error deleting old coach image.');
                        }
                    });
                    existingCoach.coachimage = `/images/coaches/${coachImage.filename}`;
                }

                existingCoach.coachname = newCoachName;
                existingCoach.description = coachDescription;

                return existingCoach.save();
            })
            .then(() => {
                res.redirect("/auth/Admin");
            })
            .catch((err) => {
                console.error("Error updating coach:", err);
                if (coachImage) {
                    fs.unlink(path.join(__dirname, '..', 'public', `/images/coaches/${coachImage.filename}`), (err) => {
                        if (err) console.error("Failed to remove uploaded image:", err);
                    });
                }
                res.status(500).send("Error updating coach");
            });
    });
};





const getCoaches = (req, res) => {
    Coach.find()
        .then(coaches => {
            res.render('coaches', { coaches });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error retrieving coaches");
        });
};






const addmeal = async (req, res) => {
    const { mealname, mealdescription, ingredients } = req.body;

    const newMeal = new Meal({
        mealname,
        mealdescription,
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients]
    });

    newMeal.save()
        .then(() => {
            res.redirect("/auth/Admin");
        })
        .catch((err) => {
            console.error("Error saving meal:", err);
            res.status(500).send("Error saving meal");
        });
};

const deleteMeal = async (req, res) => {
    const { removeMealName } = req.body;

    try {
        const deletedMeal = await Meal.findOneAndDelete({ mealname: removeMealName });
        if (!deletedMeal) {
            return res.status(404).send('Meal not found.');
        }
        res.status(200).send('Meal successfully deleted.');
    } catch (err) {
        console.error("Error deleting meal:", err);
        res.status(500).send("Error deleting meal");
    }
};

const editMeal = async (req, res) => {
    const { editMealName, newMealName, newMealdescription, newIngredients } = req.body;
console.log( req.body)
    try {
        const existingMeal = await Meal.findOne({ mealname: editMealName });
        if (!existingMeal) {
            return res.status(404).send('Meal not found.');
        }

        existingMeal.mealname = newMealName;
        existingMeal.mealdescription = newMealdescription;
        existingMeal.ingredients = newIngredients.map(ingredient => ({
            name: ingredient.name,
            quantity: ingredient.quantity
        }));

        await existingMeal.save();
        res.status(200).json({ message: 'Meal successfully updated.' });
    } catch (err) {
        console.error("Error updating meal:", err);
        res.status(500).json({ error: "Error updating meal" });
    }
};



const addExercise = (req, res) => {
    const { Exercisename, Exercisedescription, Exerciseimage, Exercisetype } = req.body;

    if (!Exercisename || !Exercisedescription || !Exerciseimage || !Exercisetype) {
        return res.status(400).send('All fields are required.');
    }

    const newExercise = new Exercise({
        exercisename: Exercisename,
        exercisedescription: Exercisedescription,
        exerciseimage: Exerciseimage, // Assuming Exerciseimage is a URL string
        exercisetype: Exercisetype
    });

    newExercise.save()
        .then(() => {
            res.redirect("/auth/Admin"); // Redirect to admin page after successful save
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving exercise.");
        });
};

const removeExercise = (req, res) => {
    const { removeExerciseName } = req.body;

    if (!removeExerciseName) {
        return res.status(400).send('Exercise Name is required.');
    }

    Exercise.findOneAndDelete({ exercisename: removeExerciseName })
        .then((exercise) => {
            if (!exercise) {
                return res.status(404).send('Exercise not found.');
            }
            res.status(200).send('Exercise removed successfully.');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error removing exercise.');
        });
};

const editExercise = (req, res) => {
    const { editExerciseName, newExerciseName, exercisedescription, exerciseimage, Exercisetype } = req.body;

    if (!editExerciseName || !newExerciseName || !exercisedescription || !exerciseimage || !Exercisetype) {
        return res.status(400).send('All fields are required.');
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
            return res.status(404).send('Exercise not found.');
        }
        res.status(200).send('Exercise updated successfully.');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error updating exercise.');
    });
};


module.exports = {
    getAllProducts, addCoach, addmeal, deleteMeal, editMeal, addProduct, deleteProduct, getCoaches, editProduct, removeCoach, addExercise, editCoach,removeExercise,editExercise
};