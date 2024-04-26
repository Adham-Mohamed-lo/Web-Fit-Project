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
