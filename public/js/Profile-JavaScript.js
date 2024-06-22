document.addEventListener("DOMContentLoaded", function () {
  const editProfileButton = document.getElementById('editProfileButton');
  const saveProfileButton = document.getElementById('saveProfileButton');
  const removeVisaButtons = document.querySelectorAll('.remove-visa-button');

  // Clicking on Edit Profile button
  editProfileButton.addEventListener('click', function () {
      toggleEditFields(true); // Enable editing
      showRemoveVisaButtons(true); // Show Remove Visa buttons
      editProfileButton.classList.add('hidden'); // Hide Edit Profile button
      saveProfileButton.classList.remove('hidden'); // Show Save Profile button
  });

  // Clicking on Save Profile button
  saveProfileButton.addEventListener('click', function () {
      document.getElementById('profileForm').submit();
      toggleEditFields(false); // Disable editing
      showRemoveVisaButtons(false); // Hide Remove Visa buttons
      saveProfileButton.classList.add('hidden'); // Hide Save Profile button
      editProfileButton.classList.remove('hidden'); // Show Edit Profile button
  });

  function toggleEditFields(editable) {
      const fields = ['userName', 'userEmail', 'userAddress', 'userGender', 'userAge', 'userSubscriptionStatus', 'userPhoneNumber'];
      fields.forEach(field => {
          const span = document.getElementById(field);
          const value = span.textContent;
          if (editable) {
              const input = document.createElement('input');
              input.type = field === 'userEmail' ? 'email' : 'text';
              if (field === 'userAge') input.type = 'number';
              input.value = value;
              input.name = field.replace('user', '').toLowerCase();
              input.id = 'input' + field;
              // Apply styles to the input field (styles omitted for brevity)
              span.parentNode.replaceChild(input, span);
          } else {
              const input = document.getElementById('input' + field);
              const span = document.createElement('span');
              span.id = field;
              span.textContent = input.value;
              input.parentNode.replaceChild(span, input);
          }
      });
  }

  function showRemoveVisaButtons(visible) {
      removeVisaButtons.forEach(button => {
          button.style.display = visible ? 'inline-block' : 'none';
      });
  }

  // Initial state
  saveProfileButton.classList.add('hidden'); // Hide Save Profile button initially
  showRemoveVisaButtons(false); // Hide Remove Visa buttons initially
});

// Dark mode handling (unchanged from your provided code)
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
