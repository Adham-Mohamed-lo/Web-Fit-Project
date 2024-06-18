function goToWorkoutPage() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      window.location.href = "/user/free-workout";
    } else {
      alert("You must login first.");
    }
}
