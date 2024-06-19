// function checkPageAndUpdateLink() {
//    var profileLink = document.getElementById('login-link');
//   var currentPath = window.location.pathname;

//   if (isLoggedIn) {
//     if (isAdmin) {
//       profileLink.href =  '/auth/admin';
//     } else {
//       profileLink.href = '/user/profile';
//     }


//     var currentPage = currentPath.split('/').pop(); 
//     if (currentPage === 'admin' || currentPage === 'profile') {
//       profileLink.textContent = 'Logout';
//       profileLink.href = 'javascript:logout();';
//     } else {
//       profileLink.textContent = 'My Profile';
//     }
//   }
// }


// function logout() {
//   try {
//     req.session.destroy(); // Destroy the session
//     res.redirect('/'); // Redirect to the homepage or login page
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// }
// checkPageAndUpdateLink();