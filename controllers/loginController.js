const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const loginProcess = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("Login-Index", {
        currentPage: 'login',
        user: req.session.user === undefined ? '' : req.session.user,
      });
    }

    const isMatch = await bcrypt.compare(password, user.userpassword);
    if (!isMatch) {
      return res.render("Login-Index", {
        currentPage: 'login',
        user: req.session.user === undefined ? '' : req.session.user,
      });
    }

    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.isAdmin = user.role

    res.render("index", {
      currentPage: "home",
      user: req.session.user === undefined ? "" : req.session.user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

};



const logout = (req, res) => {
  try {
    req.session.destroy(); 
    res.redirect('/'); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  loginProcess,logout
};
