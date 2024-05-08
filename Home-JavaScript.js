function openMembership() {
  window.open('Services/Member Ship/Membership-Index.html', '_self'); 
}
document.getElementById('membershipCard').addEventListener('click', openMembership);

function openCoaches() {
  window.open('Services/Coaches Page/Coaches-Page-Index.html', '_self'); 
}
document.getElementById('coachescard').addEventListener('click', openCoaches);

function openShop() {
  window.open('Shop/Shop-Index.html', '_self'); 
}
document.getElementById('shopcard').addEventListener('click', openShop);

function togglePopup() {
  var popup = document.getElementById("popupContainer");
  popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";
}

document.getElementById("calculateButton").addEventListener("click", function() {
  var weight = parseFloat(document.getElementById("weight").value);
  var height = parseFloat(document.getElementById("height").value);
  var age = parseInt(document.getElementById("age").value);
  var gender = document.getElementById("gender").value;

  var bmr;
  if (gender === "male") {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  var resultElement = document.getElementById("result");
  var resultLabelContainer = document.getElementById("result_container");
  var resultLabelElement = document.getElementById("result_label");
  resultLabelElement.innerHTML = "Calories Result: " + bmr.toFixed(0);
  resultLabelContainer.style.display = "block";
});
