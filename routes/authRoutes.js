const express = require("express");
const loginController = require("../controllers/loginController");
const { sign } = require("crypto");
const app = express();


app.get("/login", (req, res) => {
  res.render("Login-Index", {
    currentPage: 'login',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});


//check !!
app.post("/login", (req, res) => {
  loginController.loginProcess(req, res);
  loginController.registrationProcess(req, res);
});

// // Add a middleware to check if the user is logged in
// app.use((req, res, next) => {
//   if (req.session.user !== undefined) {
//     next();
//   } else {
//     res.render("404", {
//       user: req.session.user === undefined ? "" : req.session.user,
//       currentPage: "404",
//     });
//   }
// });

app.get('/admin', (req, res) => {
  res.render('Admin-Index', {
    currentPage: 'admin',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.get('/payment', (req, res) => {
  res.render('Payment-Index', {
    currentPage: 'payment',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});


// Add the logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
});

module.exports = app;
