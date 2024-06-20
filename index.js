require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const { connectToMongoDB } = require("./config/mongoDB.js");
const { setupRoutes } = require("./routes/routes.js");


const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.json()); 



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);
app.use((req, res, next) => {
  res.locals.notification = req.query.notification || '';
  next();
});



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

  
