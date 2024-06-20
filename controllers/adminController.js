const express = require("express");
const app = express();
const meal = require("../models/mealModel.js");
const path = require("path");
const fs = require('fs');
const multer = require('multer');
const Coach = require("../models/coachesModel.js");
const Product = require("../models/prodectshopModel.js");



const coachstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/coaches');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const coachupload = multer({ storage: coachstorage });


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

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const productUpload = multer({ storage: productStorage });



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
                res.status(500).send("Error saving coach");
            });
    });
};
const removeCoach = (req, res) => {
    const { removeCoachName } = req.body;

    console.log(`Attempting to remove coach: ${removeCoachName}`);

    Coach.findOneAndDelete({ coachname: removeCoachName })
        .then((deletedCoach) => {
            if (!deletedCoach) {
                console.log(`Coach not found: ${removeCoachName}`);
                return res.status(404).send('Coach not found.');
            }

            const imagePath = path.join(__dirname, 'public', deletedCoach.coachimage);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error deleting coach image: ${err}`);
                    return res.status(500).send('Error deleting coach image.');
                }
                console.log(`Coach removed successfully: ${removeCoachName}`);
                res.redirect("/auth/Admin");
            });
        })
        .catch((err) => {
            console.error("Error deleting coach:", err);
            res.status(500).send("Error deleting coach");
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


const postaddmeal = async (req, res) => {
    const {
        mealname,
        mealdescription,
    } = req.body;

    try {

        const existingUser = await meal.findOne({ $or: [{ mealname }, { mealdescription }] });
        if (existingUser) {
            return res.redirect("");

        }


        const newMeal = new Meal({
            mealname,
            mealdescription
        });

        await newMeal.save();

        res.redirect("/meal");
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: "Failed to register meal" });
    }

};
const deleteMeal = async (MealId, res) => {
    try {
        const deletedMeal = await User.findByIdAndDelete(MealId);

        if (!deletedMeal) {
            return res.status(404).json({ error: "meal not found" });
        }

        res.status(200).json({ message: "meal deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete meal" });
    }
};

const updateMeal = async (MealId, updateData, res) => {
    try {


        // Update user in the database
        const updatedMeal = await Meal.findByIdAndUpdate(MealId, updateData, { new: true, runValidators: true });

        if (!updatedMeal) {
            return res.status(404).json({ error: "meal not found" });
        }

        res.status(200).json({ message: "meal updated successfully", meal: updatedMeal });
    } catch (err) {
        res.status(500).json({ error: "Failed to update meal" });
    }
};


module.exports = {
    getAllProducts, addCoach, postaddmeal, deleteMeal, updateMeal, addProduct, deleteProduct, getCoaches, editProduct, removeCoach,
};