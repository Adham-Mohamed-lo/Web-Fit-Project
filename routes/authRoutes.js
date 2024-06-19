const express = require("express");
const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");
<<<<<<< HEAD
const adminController2 = require("../controllers/adminController2");

=======
const adminController = require("../controllers/adminController");
>>>>>>> b5171f8d7b61150bf9ea2ef235cee36c5b0ae1b3
const { sign } = require("crypto");
const { deleteMany } = require("../models/userModel");
const app = express();



app.get("/signup", (req, res) => {
  res.render("SignUp-Index", {
    currentPage: 'signup',
    user: req.session.user === undefined ? '' : req.session.user,
  });
});

app.post("/signup", userController.postSignup);

app.put("/update/:id", async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  await updateUser(userId, updateData, res);
});

app.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;
  await deleteUser(userId, res);
});


app.get("/login", (req, res) => {
  res.render("Login-Index", {
    currentPage: 'login',
    user: req.session.user === undefined ? '' : req.session.user,
    isLoggedIn: req.session.isLoggedIn,
    isAdmin: req.session.isAdmin,
  });
});

app.post("/login", loginController.loginProcess);

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

app.get('/logout', loginController.logout);

app.post("/addcoaches", adminController.addCoashes);



app.post("/meal", adminController2.postaddmeal);

app.put("/update/:id", async (req, res) => {
  const MealId = req.params.id;
  const updateData = req.body;
  await updateMeal(MealId, updateData, res);
});
app.delete("/delete/:id", async (req, res) => {
  const MealId = req.params.id;
  await deleteMeal(MealId, res);
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


module.exports = app;
