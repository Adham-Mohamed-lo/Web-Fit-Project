function opencontactform() {
    window.open('/Contact-Form', '_self'); 
}
document.getElementById('mailcard').addEventListener('click',opencontactform);




// Check and apply stored dark mode preference on page load
document.addEventListener('DOMContentLoaded', function () {
    const isDarkMode = localStorage.getItem('darkModeEnabled') === 'true';
    const darkModeButton = document.querySelector('.darkmode-button');
    
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeButton.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-mode');
      darkModeButton.textContent = 'Dark Mode';
    }
  });