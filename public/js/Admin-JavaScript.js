// Product Form Validation
function validateForm() {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productName = productNameInput.value.trim();
    const productPrice = productPriceInput.value.trim();
    let isValid = true;

    document.getElementById('productNameError').textContent = '';
    document.getElementById('productPriceError').textContent = '';

    if (productName === '') {
        document.getElementById('productNameError').textContent = 'Product name is required';
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(productName)) {
        document.getElementById('productNameError').textContent = 'Product name must contain only letters';
        isValid = false;
    }

    if (productPrice === '') {
        document.getElementById('productPriceError').textContent = 'Product price is required';
        isValid = false;
    } else if (isNaN(productPrice) || parseFloat(productPrice) <= 0) {
        document.getElementById('productPriceError').textContent = 'Product price must be a valid positive number';
        isValid = false;
    }

    if (isValid) {
        productNameInput.value = '';
        productPriceInput.value = '';
        document.getElementById('successMessage').textContent = 'Product Added';
    }

    return isValid;
}

// Coach Form Validation
function validateCoachForm() {
    const coachNameInput = document.getElementById('coachName');
    const coachSpecialtyInput = document.getElementById('coachSpecialty');
    const coachName = coachNameInput.value.trim();
    const coachSpecialty = coachSpecialtyInput.value.trim();
    let isValid = true;

    document.getElementById('coachNameError').textContent = '';
    document.getElementById('coachSpecialtyError').textContent = '';

    if (coachName === '') {
        document.getElementById('coachNameError').textContent = 'Coach name is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(coachName)) {
        document.getElementById('coachNameError').textContent = 'Coach name must contain only letters';
        isValid = false;
    }

    if (coachSpecialty === '') {
        document.getElementById('coachSpecialtyError').textContent = 'Coach specialty is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(coachSpecialty)) {
        document.getElementById('coachSpecialtyError').textContent = 'Coach specialty must contain only letters';
        isValid = false;
    }

    if (isValid) {
        coachNameInput.value = '';
        coachSpecialtyInput.value = '';
        document.getElementById('coachSuccessMessage').textContent = 'Coach Added';
    }

    return isValid;
}

// Edit Coach Form Validation
function validateEditCoachForm() {
    const editCoachNameInput = document.getElementById('editCoachName');
    const editCoachSpecialtyInput = document.getElementById('editCoachSpecialty');
    const newCoachNameInput = document.getElementById('newCoachName');
    const newCoachSpecialtyInput = document.getElementById('newCoachSpecialty');
    const editCoachName = editCoachNameInput.value.trim();
    const editCoachSpecialty = editCoachSpecialtyInput.value.trim();
    const newCoachName = newCoachNameInput.value.trim();
    const newCoachSpecialty = newCoachSpecialtyInput.value.trim();
    let isValid = true;

    document.getElementById('editCoachNameError').textContent = '';
    document.getElementById('editCoachSpecialtyError').textContent = '';
    document.getElementById('newCoachNameError').textContent = '';
    document.getElementById('newCoachSpecialtyError').textContent = '';
    document.getElementById('editCoachSuccessMessage').textContent = '';

    if (editCoachName === '') {
        document.getElementById('editCoachNameError').textContent = 'Coach name is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(editCoachName)) {
        document.getElementById('editCoachNameError').textContent = 'Coach name must contain only letters';
        isValid = false;
    }

    if (editCoachSpecialty === '') {
        document.getElementById('editCoachSpecialtyError').textContent = 'Coach specialty is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(editCoachSpecialty)) {
        document.getElementById('editCoachSpecialtyError').textContent = 'Coach specialty must contain only letters';
        isValid = false;
    }

    if (newCoachName === '') {
        document.getElementById('newCoachNameError').textContent = 'New name is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(newCoachName)) {
        document.getElementById('newCoachNameError').textContent = 'New name must contain only letters';
        isValid = false;
    } else if (newCoachName.toLowerCase() === editCoachName.toLowerCase()) {
        document.getElementById('newCoachNameError').textContent = 'New name must be different from the coach name';
        isValid = false;
    }

    if (newCoachSpecialty === '') {
        document.getElementById('newCoachSpecialtyError').textContent = 'New specialty is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(newCoachSpecialty)) {
        document.getElementById('newCoachSpecialtyError').textContent = 'New specialty must contain only letters';
        isValid = false;
    } else if (newCoachSpecialty.toLowerCase() === editCoachSpecialty.toLowerCase()) {
        document.getElementById('newCoachSpecialtyError').textContent = 'New specialty must be different from the current one';
        isValid = false;
    }

    if (isValid) {
        editCoachNameInput.value = '';
        editCoachSpecialtyInput.value = '';
        newCoachNameInput.value = '';
        newCoachSpecialtyInput.value = '';
        document.getElementById('editCoachSuccessMessage').textContent = 'Edited Successfully';
    }

    return isValid;
}

// Remove Coach Form Validation
function validateremoveCoachForm() {
    const coachNameInput = document.getElementById('removeCoachName');
    const coachName = coachNameInput.value.trim();
    let isValid = true;

    document.getElementById('removeCoachNameError').textContent = '';

    if (coachName === '') {
        document.getElementById('removeCoachNameError').textContent = 'Coach name is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(coachName)) {
        document.getElementById('removeCoachNameError').textContent = 'Coach name must contain only letters';
        isValid = false;
    }

    if (isValid) {
        // Send the form data to the server using fetch
        fetch('/auth/removecoach', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ removeCoachName: coachName }) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Server response:', data); 
            document.getElementById('removeCoachSuccessMessage').textContent = 'Coach Removed'; 
            coachNameInput.value = ''; 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return isValid;
}

// Remove Product Form Validation
function validateremoveProductForm() {
    const productNameInput = document.getElementById('removeProductName');
    const productName = productNameInput.value.trim();
    let isValid = true;

    document.getElementById('removeProductNameError').textContent = '';

    if (productName === '') {
        document.getElementById('removeProductNameError').textContent = 'Product name is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(productName)) {
        document.getElementById('removeProductNameError').textContent = 'Product name must contain only letters';
        isValid = false;
    }

    if (isValid) {
        productNameInput.value = '';
        document.getElementById('removeProductSuccessMessage').textContent = 'Product Removed';
    }

    return isValid;
}

// Edit Product Form Validation
function validateEditProductForm() {
    const editProductNameInput = document.getElementById('editProductName');
    const newProductNameInput = document.getElementById('newProductName');
    const editProductName = editProductNameInput.value.trim();
    const newProductName = newProductNameInput.value.trim();
    let isValid = true;

    document.getElementById('editProductNameError').textContent = '';
    document.getElementById('newProductNameError').textContent = '';
    document.getElementById('editProductSuccessMessage').textContent = '';

    if (editProductName === '') {
        document.getElementById('editProductNameError').textContent = 'Product name is required';
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(editProductName)) {
        document.getElementById('editProductNameError').textContent = 'Product name must contain only letters';
        isValid = false;
    }

    if (newProductName === '') {
        document.getElementById('newProductNameError').textContent = 'New name is required';
        isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(newProductName)) {
        document.getElementById('newProductNameError').textContent = 'New name must contain only letters';
        isValid = false;
    } else if (newProductName.toLowerCase() === editProductName.toLowerCase()) {
        document.getElementById('newProductNameError').textContent = 'New name must be different from the product name';
        isValid = false;
    }

    if (isValid) {
        editProductNameInput.value = '';
        newProductNameInput.value = '';
        document.getElementById('editProductSuccessMessage').textContent = 'Edited Successfully';
    }

    return isValid;
}

// Toggle visibility of containers
let isStatsContainerRight = false;
let isStatsContainerMiddle = false;

function toggleVisibility(containerId) {
    // Hide all other containers
    document.querySelectorAll('.action-container').forEach(container => {
        if (container.id !== containerId) {
            container.classList.add('hidden');
        }
    });

    // Toggle visibility of the selected container
    const container = document.getElementById(containerId);
    if (container) {
        container.classList.toggle('hidden');
    }

    toggleStatsContainer();
}

function toggleStatsContainer() {
    const statsContainer = document.getElementById('stats_Container');

    if (isStatsContainerMiddle) {
        statsContainer.classList.remove('middle');
        isStatsContainerMiddle = false;
        isStatsContainerRight = false;
    } else if (isStatsContainerRight) {
        statsContainer.classList.remove('right');
        statsContainer.classList.add('middle');
        isStatsContainerMiddle = true;
    } else {
        statsContainer.classList.add('right');
        isStatsContainerRight = true;
    }
}