
  
  document.addEventListener("DOMContentLoaded", function() {
    
    const workoutsButton = document.getElementById("workoutsButton");
    const mealsButton = document.getElementById("mealsButton");
    const subscriptionButton = document.getElementById("subscriptionButton");

   
    workoutsButton.addEventListener("click", function() {
        
        window.location.href = "/user/front-workout";
    });

    mealsButton.addEventListener("click", function() {
        
        window.location.href = "/user/meal";
    });

    subscriptionButton.addEventListener("click", function() {
      
        window.location.href = "/plans";
    });
});




// Check and apply stored dark mode preference on page load
document.addEventListener('DOMContentLoaded', function () {
    const isDarkMode = localStorage.getItem('darkModeEnabled') === 'true';
    const darkModeButton = document.querySelector('.darkmode-button');
    
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeButton.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-mode');
      darkModeButton.textContent = 'Dark Mode';
    }
  });
  