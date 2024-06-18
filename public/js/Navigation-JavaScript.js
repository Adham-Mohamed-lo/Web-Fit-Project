function checkPageAndUpdateLink() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  var isAdmin = sessionStorage.getItem("isAdmin") === "true";
  var profileLink = document.getElementById('login-link');
  var currentPath = window.location.pathname;
  var basePath = '';

  if (isLoggedIn) {
    if (isAdmin) {
      profileLink.href =  '/auth/admin';
    } else {
      profileLink.href ='/user/profile';
    }


    var currentPage = currentPath.split('/').pop(); 
    if (currentPage === 'admin' || currentPage === 'profile') {
      profileLink.textContent = 'Logout';
      profileLink.href = 'javascript:logout();';
    } else {
      profileLink.textContent = 'My Profile';
    }
  }
}

function logout() {
  sessionStorage.setItem("isLoggedIn", "false");
  sessionStorage.setItem("isAdmin", "false");
  window.location.href = '/auth/logout'; //check if it works !!!
}
checkPageAndUpdateLink();