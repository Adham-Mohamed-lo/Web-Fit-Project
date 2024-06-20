
function goToWorkoutPage() {
  var isLoggedIn = '<%= JSON.stringify(user) %>' !== '';
  if (isLoggedIn) {
    window.location.href = "/user/free-workout";
  } else {
    alert("You must login first.");

    window.location.href = "/auth/login"; 
  }
}
