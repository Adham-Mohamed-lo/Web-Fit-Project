const express = require("express");
const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const { sign } = require("crypto");
const app = express.Router();
const User = require('../models/userModel');

// app.use((req, res, next) => {
//   if (req.session.user !== undefined) {
//     next();
//   } else {
//     const notification = 'Please log in to access this page.';
//       res.redirect(`/auth/login?notification=${notification}`);
//     // res.render("404", {
//     //   user: req.session.user === undefined ? "" : req.session.user,
//     //   currentPage: "404",
//     // });
//   }
// });

app.get("/signup", (req, res) => {
  res.render("SignUp-Index", {
    currentPage: "signup",
    user: req.session.user === undefined ? "" : req.session.user,
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
    currentPage: "login",
    user: req.session.user === undefined ? "" : req.session.user,
    isLoggedIn: req.session.isLoggedIn,
    isAdmin: req.session.isAdmin,
  });
});

app.post("/login", loginController.loginProcess);

app.get("/admin", (req, res) => {
  if (req.session.user !== undefined && req.session.isAdmin) {
    res.render("Admin-Index", {
      currentPage: "admin",
      user: req.session.user === undefined ? "" : req.session.user,
    });
  } else {
    const notification = "Please log in to access this page.";
    res.redirect(`/auth/login?notification=${notification}`);
  }
});

app.get("/payment", async(req, res) => {
  if (req.session.user !== undefined) {
    try {
      const user = await User.findById(req.session.user._id).select('visa');
      const maskedCards = user.visa.map(card => {
        return {
          _id: card._id,
          maskedNumber: `**** **** **** ${card.last4digits}`, // Use the stored last 4 digits
          expiredate: card.expiredate
        };
      });

      res.render("Payment-Index", {
        currentPage: "payment",
        user: req.session.user,
        cards: maskedCards, // Pass the masked cards to the view
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    const notification = "Please log in to access this page.";
    res.redirect(`/auth/login?notification=${notification}`);
  }
});

app.post("/add-card", async (req, res) => {
  try {
    await userController.addCardToUser(req.session.user._id, req.body);
    res.redirect("/premium-plan"); 
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message); 
  }
});


app.get("/logout", loginController.logout);

app.post("/addcoaches", adminController.addCoach);
app.post("/removecoach", adminController.removeCoach);
app.post("/editcoaches", adminController.editCoach);

app.get("/getcoaches", adminController.getCoaches);

//app.get('/shop', adminController.getAllProducts);
app.post("/addProduct", adminController.addProduct);
app.post("/removeProduct", adminController.deleteProduct);
app.post("/editProduct", adminController.editProduct);

// meal routes functions
app.post("/addmeal", adminController.addmeal);
app.post("/removemeal", adminController.deleteMeal);
app.post("/editmeal", adminController.editMeal);

app.post("/addexercise", adminController.addExercise);
app.post("/removeexercise", adminController.removeExercise);
app.post("/editexercise", adminController.editExercise);

// Add a middleware to check if the user is logged in

module.exports = app;
