document.addEventListener("DOMContentLoaded", function() {
    const pushCard = document.getElementById("push");
    const pullCard = document.getElementById("pull");
    const legsCard = document.getElementById("legs");

    pushCard.addEventListener("click", function() {
        window.location.href = "push.html";
    });

    pullCard.addEventListener("click", function() {
        window.location.href = "pull.html";
    });

    legsCard.addEventListener("click", function() {
        window.location.href = "legs.html";
    });
});