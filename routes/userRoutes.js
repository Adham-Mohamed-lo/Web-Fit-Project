const express = require("express");
const userController = require("../controllers/userController");
const app = express.Router();
const User = require('../models/userModel');
const Product = require('../models/prodectshopModel'); 
const mongoose = require('mongoose');
const Meal = require('../models/mealModel');
const Exercise = require('../models/excerciseModel');

 
app.use((req, res, next) => { //"yet to know" shoft hn3ml eh fy dah 
  if (req.session.user !== undefined) {
    next();
   } else {
    const notification = 'Please log in to access this page.';
      res.redirect(`/auth/login?notification=${notification}`);
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

app.get('/front-workout', (req, res) => {
  res.render('Front-Workout-Page-Index', {
    currentPage: 'front-workout',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/meal', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.render('Meal-Index', {
      currentPage: 'meal',
      user: req.session.user === undefined ? '' : req.session.user,
      meals: meals
    });
  } catch (error) {
    res.status(500).send('Error fetching meals');
  }
});

app.get('/free-workout', (req, res) => {
  Exercise.find({ exercisetype: 'free' })
    .then((exercises) => {
      res.render('Free-Workout-Page-Index', {
        currentPage: 'free-workout',
        user: req.session.user === undefined ? '' : req.session.user,
        exercises: exercises
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching exercises.');
    });
});



app.get('/legs-workout', (req, res) => {
  Exercise.find({ exercisetype: 'leg' })
    .then((exercises) => {
      res.render('Legs-Workout-Index', {
        currentPage: 'legs-workout',
        user: req.session.user === undefined ? '' : req.session.user,
        exercises: exercises
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching exercises.');
    });
});


app.get('/pull-workout', (req, res) => {
  Exercise.find({ exercisetype: 'pull' })
    .then((exercises) => {
      res.render('Pull-Workout-Index', {
        currentPage: 'pull-workout',
        user: req.session.user === undefined ? '' : req.session.user,
        exercises: exercises
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching exercises.');
    });
});

app.get('/push-workout', (req, res) => {
  Exercise.find({ exercisetype: 'push' })
    .then((exercises) => {
      res.render('Push-Workout-Index', {
        currentPage: 'push-workout',
        user: req.session.user === undefined ? '' : req.session.user,
        exercises: exercises
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching exercises.');
    });
});

module.exports = app;
