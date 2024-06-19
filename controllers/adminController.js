const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const Coach = require("./models/coachesModel.js");
app.post("/coaches", (req, res) => {
    const { coachname, coachdescription, coachimage } = req.body;
    const newCoach = new Coach({
        coachname,
        coachdescription,
        coachimage
    });

    newCoach.save()
        .then(() => {
            res.send("Coach added successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error saving coach");
        });
});