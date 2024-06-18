require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const { connectToMongoDB } = require("./config/mongo.js");
const { setupRoutes } = require("./routes/routes.js");

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // check !!! video
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectToMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

setupRoutes(app);

  
