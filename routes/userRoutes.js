const express = require("express");
const userController = require("../controllers/userController");
const app = express();

// Add a middleware to check if the user is logged in
app.use((req, res, next) => { //"yet to know" shoft hn3ml eh fy dah 
  if (req.session.user !== undefined) {
    next();
  } else {
    res.render("404", {
      user: req.session.user === undefined ? "" : req.session.user,
      currentPage: "404",
    });
  }
});

app.get('/profile', (req, res) => {
  res.render('Profile-Index', {
    currentPage: 'profile',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});


app.get('/free-plan', (req, res) => {
  res.render('Free-plan-Index', {
    currentPage: 'free-plan',
    user: req.session.user === undefined ? '' : req.session.user,
  });
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
