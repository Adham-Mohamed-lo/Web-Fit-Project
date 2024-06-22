document.addEventListener('DOMContentLoaded', function () {
  var notificationBar = document.getElementById('notification-bar');
  if (notificationBar) {
    var notificationContent = notificationBar.querySelector('.notification-content');
    setTimeout(function () {
      notificationBar.classList.add('show');

      // Set the height of the notification bar to match the height of the content
      notificationBar.style.height = notificationContent.scrollHeight + 'px';

      setTimeout(function () {
        notificationBar.classList.remove('show');
        
        // Reset the height after the notification is hidden
        notificationBar.style.height = '0';
      }, 2000); 
    }, 400); 
  }
});
