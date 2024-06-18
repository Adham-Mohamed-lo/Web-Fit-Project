const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.render("index", {
    currentPage: "home",
    user: req.session.user === undefined ? "" : req.session.user,
  });
});


app.get('/about', (req, res) => {
  res.render('About-Index', {
    currentPage: 'about',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/about-contact-form', (req, res) => {
  res.render('About-Contact-Form-Index', {
    currentPage: 'about-contact-form',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/coaches', (req, res) => {
  res.render('Coaches-Page-Index', {
    currentPage: 'coaches',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/contact-form', (req, res) => {
  res.render('Contact-Form-Index', {
    currentPage: 'contact-form',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/contact', (req, res) => {
  res.render('Contact-Index', {
    currentPage: 'contacts',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/membership', (req, res) => {
  res.render('Membership-Index', {
    currentPage: 'membership',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/plans', (req, res) => {
  res.render('Plans-Index', {
    currentPage: 'plans',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/premium-plan', (req, res) => {
  res.render('Premium-Plan-Index', {
    currentPage: 'premium-plan',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/standard-plan', (req, res) => {
  res.render('Standard-Plan-Index', {
    currentPage: 'standard-plan',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/schedule-1', (req, res) => {
  res.render('Schedule-1-Index', {
    currentPage: 'schedule-1',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/schedule-2', (req, res) => {
  res.render('Schedule-2-Index', {
    currentPage: 'schedule-2',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/schedule-3', (req, res) => {
  res.render('Schedule-3-Index', {
    currentPage: 'schedule-3',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/shop', (req, res) => {
  res.render('Shop-Index', {
    currentPage: 'shop',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});




module.exports = app;
