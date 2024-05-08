function goToWorkoutPage() {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      window.location.href = "Free%20Workout%20Page/free-Workout-Page-Index.html";
    } else {
      alert("You must login first.");
    }
}
