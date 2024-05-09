function checkPageAndUpdateLink() {
  var isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  var isAdmin = sessionStorage.getItem("isAdmin") === "true";
  var profileLink = document.getElementById('login-link');
  var currentPath = window.location.pathname;
  var basePath = '';

  if (isLoggedIn) {
    if (isAdmin) {
      if (currentPath.includes('subfolder1')) {
        basePath = '../';
      } else if (currentPath.includes('subfolder2')) {
        basePath = '../../';
      } else {
        basePath = '../../../';
      }
      profileLink.href = basePath + 'Admin/Admin-Index.html';
    } else {
      if (currentPath.includes('subfolder1')) {
        basePath = '../';
      } else if (currentPath.includes('subfolder2')) {
        basePath = '../../';
      } else {
        basePath = '../../../';
      }
      profileLink.href = basePath + 'Profile/Profile-Index.html';
    }

  
    var currentPage = currentPath.split('/').pop(); 
    if (currentPage === 'Admin-Index.html' || currentPage === 'Profile-Index.html') {
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
  window.location.href = '../Login/Login-Index.html'; 
}
checkPageAndUpdateLink();
