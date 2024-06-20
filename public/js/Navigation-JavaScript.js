document.addEventListener('DOMContentLoaded', function () {
    var notificationBar = document.getElementById('notification-bar');
    if (notificationBar) {
      setTimeout(function () {
        notificationBar.classList.add('show');

        notificationBar.style.height = notificationBar.scrollHeight + 'px';

        setTimeout(function () {
          notificationBar.classList.remove('show');
        }, 2000); 
      }, 400); 
    }
});
