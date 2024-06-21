const express = require("express");
const userController = require("../controllers/userController");
const app = express.Router();
const User = require('../models/userModel');
const Product = require('../models/prodectshopModel'); 
const mongoose = require('mongoose');

// Add a middleware to check if the user is logged in
app.use((req, res, next) => { //"yet to know" shoft hn3ml eh fy dah 
  if (req.session.user !== undefined) {
    next();
   } else {
    const notification = 'Please log in to access this page.';
      res.redirect(`/auth/login?notification=${notification}`);
  //res.status(401).json({ error: 'You must log in first.' });
  //   res.render("404", {
  //     user: req.session.user === undefined ? "" : req.session.user,
  //     currentPage: "404",
  //   });
  }
});



app.post('/api/cart', userController.updateCart);
app.get('/api/cart', userController.getCart);



app.get('/profile', async (req, res) => {
  try {

    const user = req.session.user;


    if (!user) {
      return res.status(404).send('User not found');
    }

    if (req.headers.accept && req.headers.accept.indexOf('application/json') !== -1) {

      return res.json(user);
    } else {

      return res.render('Profile-Index', {
        currentPage: 'profile',
        user: user,
      });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});


app.get('/free-workout', (req, res) => {
  res.render('Free-Workout-Page-Index', {
    currentPage: 'free-workout',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/front-workout', (req, res) => {
  res.render('Front-Workout-Page-Index', {
    currentPage: 'front-workout',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/legs-workout', (req, res) => {
  res.render('Legs-Workout-Index', {
    currentPage: 'legs-workout',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/meal', (req, res) => {
  res.render('Meal-Index', {
    currentPage: 'meal',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/pull-workout', (req, res) => {
  res.render('Pull-Workout-Index', {
    currentPage: 'pull-workout',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/push-workout', (req, res) => {
  res.render('Push-Workout-Index', {
    currentPage: 'push-workout',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

module.exports = app;
