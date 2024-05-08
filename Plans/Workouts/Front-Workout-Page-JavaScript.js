document.addEventListener("DOMContentLoaded", function() {
    const pushCard = document.getElementById("push");
    const pullCard = document.getElementById("pull");
    const legsCard = document.getElementById("legs");

    pushCard.addEventListener("click", function() {
        window.location.href = "Push Workouts/Push-Workout-Index.html";
    });

    pullCard.addEventListener("click", function() {
        window.location.href = "Pull Workouts/Pull-Workout-Index.html";
    });

    legsCard.addEventListener("click", function() {
        window.location.href = "Legs Workouts/Legs-Workout-Index.html";
    });
});