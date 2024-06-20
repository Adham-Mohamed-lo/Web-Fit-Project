const express = require("express");
const app = express();
const meal = require("../models/mealModel.js");
const path = require("path");
const Coach = require("../models/coachesModel.js");
const fileUpload = require('express-fileupload');

// Use express-fileupload middleware
app.use(fileUpload());

const addCoashes = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { coachname, coachdescription } = req.body;
    const coachimage = req.files.coachimage;

    // Determine the upload path based on coachname (assuming unique)
    const uploadPath = path.join(__dirname, `../public/images/${coachname}.png`);

    // Move the uploaded file to the designated directory
    coachimage.mv(uploadPath, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        // Create a new Coach object with data from the request
        const newCoach = new Coach({
            coachname,
            coachdescription,
            coachimage: `/images/${coachname}.png`  // Save the relative path to the image
        });

        // Save the new Coach object to MongoDB
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

module.exports = {
    addCoashes
};






const postaddmeal = async (req, res) => {
    const {
        mealname,
        mealdescription,
    } = req.body;

    try {
        const existingUser = await meal.findOne({ $or: [{ mealname }, { mealdescription }] });
        if (existingUser) {
            return res.redirect("/");//

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
    addCoashes, postaddmeal, deleteMeal, updateMeal
};