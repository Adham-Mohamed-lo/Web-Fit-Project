function toggleVisibility(id) {
    const container = document.getElementById(id);
    container.classList.toggle('hidden');
}

function validateForm() {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productName = productNameInput.value.trim();
    const productPrice = productPriceInput.value.trim();
    let isValid = true;

    // Reset error messages
    document.getElementById('productNameError').textContent = '';
    document.getElementById('productPriceError').textContent = '';

    // Validate product name
    if (productName === '') {
        document.getElementById('productNameError').textContent = 'Product name is required';
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(productName)) {
        document.getElementById('productNameError').textContent = 'Product name must contain only letters';
        isValid = false;
    }

    // Validate product price
    if (productPrice === '') {
        document.getElementById('productPriceError').textContent = 'Product price is required';
        isValid = false;
    } else if (isNaN(productPrice) || parseFloat(productPrice) <= 0) {
        document.getElementById('productPriceError').textContent = 'Product price must be a valid positive number';
        isValid = false;
    }

    // If form is valid, clear input fields and display success message
    if (isValid) {
        productNameInput.value = '';
        productPriceInput.value = '';
        document.getElementById('successMessage').textContent = 'Product Added';
    }

    return isValid;
}
function validateCoachForm() {
const coachNameInput = document.getElementById('coachName');
const coachSpecialtyInput = document.getElementById('coachSpecialty');
const coachName = coachNameInput.value.trim();
const coachSpecialty = coachSpecialtyInput.value.trim();
let isValid = true;

// Reset error messages
document.getElementById('coachNameError').textContent = '';
document.getElementById('coachSpecialtyError').textContent = '';

// Validate coach name
if (coachName === '') {
document.getElementById('coachNameError').textContent = 'Coach name is required';
isValid = false;
} else if (!/^[a-zA-Z\s]+$/.test(coachName)) {
document.getElementById('coachNameError').textContent = 'Coach name must contain only letters';
isValid = false;
}

// Validate coach specialty
if (coachSpecialty === '') {
document.getElementById('coachSpecialtyError').textContent = 'Coach specialty is required';
isValid = false;
} else if (!/^[a-zA-Z\s]+$/.test(coachSpecialty)) {
document.getElementById('coachSpecialtyError').textContent = 'Coach specialty must contain only letters';
isValid = false;
}

// If form is valid, clear input fields and display success message
if (isValid) {
coachNameInput.value = '';
coachSpecialtyInput.value = '';
document.getElementById('coachSuccessMessage').textContent = 'Coach Added';
}

return isValid;
}