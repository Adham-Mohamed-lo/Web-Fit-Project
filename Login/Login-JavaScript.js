function toggleSignupForm() {
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    const signupButton = document.querySelector('.signup-button');

    if (loginContainer.style.display === 'none') {
      loginContainer.style.display = 'block';
      signupContainer.style.display = 'none';
      signupButton.textContent = 'Signup';
    } else {
      loginContainer.style.display = 'none';
      signupContainer.style.display = 'block';
      signupButton.textContent = 'Back to Login';
    }
  }

  function signUp() {
    // Retrieve form input values
    const fullName = document.getElementById('signup-fullname').value;
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const age = document.getElementById('signup-age').value;
    const gender = document.getElementById('signup-gender').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Construct data object to save to localStorage
    const userData = {
      fullName: fullName,
      username: username,
      email: email,
      age: age,
      gender: gender,
      password: password
    };

    // Save user data to localStorage (for demonstration purposes only)
    localStorage.setItem(email, JSON.stringify(userData));

    // Inform the user that signup was successful
    alert('Signup successful!');
  }

  function login() {
    // Retrieve form input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve user data from localStorage based on username
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
        // Username not found
        alert('Username not found. Please sign up.');
        return;
    }

    // Check if the entered password matches the stored password
    if (password === foundUser.password) {
        // Successful login
        alert('Login successful!');
    } else {
        // Incorrect password
        alert('Incorrect password.');
    }
}