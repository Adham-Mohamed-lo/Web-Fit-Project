function goToWorkoutPage() {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      window.location.href = "free-workoutpage.html";
    } else {
      alert("You must login first.");
    }
  }
  