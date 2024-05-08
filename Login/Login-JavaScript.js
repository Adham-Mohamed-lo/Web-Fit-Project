function toggleSignupForm() {
  const loginContainer = document.getElementById("login-container");
  const signupContainer = document.getElementById("signup-container");
  const signupButton = document.querySelector(".signup-button");

  if (loginContainer.style.display === "none") {
    loginContainer.style.display = "block";
    signupContainer.style.display = "none";
    signupButton.textContent = "Signup";
  } else {
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
    signupButton.textContent = "Back to Login";
  }
}

function signUp() {
  const fullName = document.getElementById("signup-fullname").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const age = document.getElementById("signup-age").value.trim();
  const gender = document.getElementById("signup-gender").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (
    !fullName ||
    !username ||
    !email ||
    !age ||
    !gender ||
    !password ||
    !confirmPassword
  ) {
    alert("Please fill out all the fields.");
    return;
  }

  if (parseInt(age) < 1) {
    alert("Age must be 1 or greater.");
    return;
  }

  if (/\d/.test(fullName)) {
    alert("Full name should not contain numbers.");
    return;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const userData = {
    fullName: fullName,
    username: username,
    email: email,
    age: age,
    gender: gender,
    password: password,
  };

  localStorage.setItem(email, JSON.stringify(userData));

  alert("Signup successful!");
}

let isLoggedIn = false;

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let foundUser = null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const userDataString = localStorage.getItem(key);
    const userData = JSON.parse(userDataString);
    if (userData.username === username) {
      foundUser = userData;
      break;
    }
  }

  if (!foundUser) {
    alert("Username not found. Please sign up.");
    return;
  }

  if (password === foundUser.password) {
    alert("Login successful!");
    isLoggedIn = true; 
    sessionStorage.setItem("isLoggedIn", "true"); 
    console.log("isLoggedIn set to true  " + isLoggedIn);
    
  } else {
    alert("Incorrect password.");
    isLoggedIn = false; 
    sessionStorage.setItem("isLoggedIn", "false"); 
    console.log("isLoggedIn set to false  " + isLoggedIn);
  }
}


function logout() {
  sessionStorage.removeItem('isLoggedIn'); 
}

