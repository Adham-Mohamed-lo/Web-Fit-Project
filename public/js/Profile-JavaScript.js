
  
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

  