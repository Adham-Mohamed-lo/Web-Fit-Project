const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Coach = require("../models/coachesModel.js");


const addCoashes = async (req, res) => {

    const { coachname, coachdescription, coachimage } = req.body;
    const newCoach = new Coach({
        coachname,
        coachdescription,
        coachimage
    });

    newCoach.save()
        .then(() => {
            res.redirect("/auth/Admin");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving coach");
        });
};


module.exports = {
    addCoashes
  };
  