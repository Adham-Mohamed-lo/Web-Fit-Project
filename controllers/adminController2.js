const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const meal = require("../models/mealModel.js");
const postaddmeal = async (req, res) =>  {
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
    postaddmeal,deleteMeal,updateMeal
  };
  