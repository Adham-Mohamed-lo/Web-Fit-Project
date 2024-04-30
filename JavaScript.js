function openmembership() {
    window.open('../Services/Membership-index.html', '_self'); 
}
document.getElementById('membershipCard').addEventListener('click', openmembership);

function opencoaches() {
    window.open('../Services/coaches-page.html', '_self'); 
}
document.getElementById('coachescard').addEventListener('click', opencoaches);

function openshop() {
    window.open('../Shop/Shop-Index.html', '_self'); 
}
document.getElementById('shopcard').addEventListener('click', openshop);