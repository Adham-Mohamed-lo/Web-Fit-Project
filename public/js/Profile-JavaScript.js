
document.addEventListener("DOMContentLoaded", function () {
    const workoutsButton = document.getElementById("workoutsButton");
    const mealsButton = document.getElementById("mealsButton");
    const subscriptionButton = document.getElementById("subscriptionButton");

    workoutsButton.addEventListener("click", function () {
        window.location.href = "/user/front-workout";
    });

    mealsButton.addEventListener("click", function () {
        window.location.href = "/user/meal";
    });

    subscriptionButton.addEventListener("click", function () {
        window.location.href = "/plans";
    });

    const editProfileButton = document.getElementById('editProfileButton');
    const saveProfileButton = document.getElementById('saveChangesButton');
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
        // Assuming you have a function saveProfileChanges() to handle saving changes
        saveProfileChanges(); // Save profile changes
        toggleEditFields(false); // Disable editing
        showRemoveVisaButtons(false); // Hide Remove Visa buttons
        saveProfileButton.classList.add('hidden'); // Hide Save Profile button
        editProfileButton.classList.remove('hidden'); // Show Edit Profile button

        // Redirect to Payment-Index.ejs page
        window.location.href = 'Payment-Index.ejs';
    });

    function toggleEditFields(editable) {
        const fields = ['userName', 'userEmail', 'userAddress', 'userGender', 'userAge', 'userSubscriptionStatus', 'userPhoneNumber'];
        fields.forEach(field => {
            const span = document.getElementById(field);
            const value = span.textContent;
            if (editable) {
                let input;
                if (field === 'userSubscriptionStatus') {
                    input = document.createElement('select');
                    input.id = 'edit-subscription';
                    input.name = 'Subscription';
                    input.required = true;

                    const options = [
                        { value: '', text: 'Select' },
                        { value: 'Free', text: 'Free' },
                        { value: 'Standard', text: 'Standard' },
                        { value: 'Premium', text: 'Premium' }
                    ];

                    options.forEach(optionData => {
                        const option = document.createElement('option');
                        option.value = optionData.value;
                        option.textContent = optionData.text;
                        if (optionData.value === value) option.selected = true;
                        input.appendChild(option);
                    });
                } else {
                    input = document.createElement('input');
                    input.type = field === 'userEmail' ? 'email' : 'text';
                    if (field === 'userAge') input.type = 'number';
                    input.value = value;
                    input.name = field.replace('user', '').toLowerCase();
                    input.id = 'input' + field;
                }

                // Apply styles to the input field (styles omitted for brevity)
                span.parentNode.replaceChild(input, span);
            } else {
                const input = document.getElementById(field === 'userSubscriptionStatus' ? 'edit-subscription' : 'input' + field);
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

    // Function to simulate saving profile changes
    function saveProfileChanges() {
        // In a real application, you would typically submit form data or update backend
        console.log('Profile changes saved.'); // Placeholder for demonstrating functionality
    }

    // Initial state
    saveProfileButton.classList.add('hidden'); // Hide Save Profile button initially
    showRemoveVisaButtons(false); // Hide Remove Visa buttons initially
});