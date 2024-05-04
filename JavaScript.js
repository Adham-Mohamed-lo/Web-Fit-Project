function openmembership() {
    window.open('Services/Membership-index.html', '_self'); 
}
document.getElementById('membershipCard').addEventListener('click', openmembership);

function opencoaches() {
    window.open('Services/coaches-page.html', '_self'); 
}
document.getElementById('coachescard').addEventListener('click', opencoaches);

function openshop() {
    window.open('Shop/Shop-Index.html', '_self'); 
}
document.getElementById('shopcard').addEventListener('click', openshop);
function togglePopup() {
    var popup = document.getElementById("popupContainer");
    popup.style.display = (popup.style.display === "none") ? "block" : "none";
}

function calculateCalories() {
    var age = parseInt(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var activityLevel = parseFloat(document.getElementById("activityLevel").value);
    var weightGoal = document.getElementById("weightGoal").value;

    
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = "Calories: [Your calculated calories]";
}
