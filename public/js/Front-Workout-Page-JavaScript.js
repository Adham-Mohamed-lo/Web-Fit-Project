document.addEventListener("DOMContentLoaded", function() {
    const pushCard = document.getElementById("push");
    const pullCard = document.getElementById("pull");
    const legsCard = document.getElementById("legs");

    pushCard.addEventListener("click", function() {
        window.location.href = "/user/push-workout";
    });

    pullCard.addEventListener("click", function() {
        window.location.href = "/user/pull-workout";
    });

    legsCard.addEventListener("click", function() {
        window.location.href = "/user/legs-workout";
    });
});