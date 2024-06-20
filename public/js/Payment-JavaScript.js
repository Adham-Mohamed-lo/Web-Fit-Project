document.querySelector('.card-number-input').oninput = () =>{
    document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
}

document.querySelector('.card-holder-input').oninput = () =>{
    document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
}

document.querySelector('.month-input').oninput = () =>{
    document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
}

document.querySelector('.year-input').oninput = () =>{
    document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
}

document.querySelector('.cvv-input').onmouseenter = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

document.querySelector('.cvv-input').onmouseleave = () =>{
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

document.querySelector('.cvv-input').oninput = () =>{
    document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
}
  function validateCreditCard() {
    var errors = [];
    var cardNumber = document.querySelector('.card-number-input').value;
    var cardHolder = document.querySelector('.card-holder-input').value;
    var expMonth = document.querySelector('.month-input').value;
    var expYear = document.querySelector('.year-input').value;
    var cvv = document.querySelector('.cvv-input').value;
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        errors.push("Invalid card number!");
    }
    if (!cardHolder || !/^[a-zA-Z\s]+$/.test(cardHolder)) {
        errors.push("Invalid card holder name!");
    } 
    if (cardHolder.trim() === "") {
        errors.push("Card holder name cannot be empty!");
    }
    if (expMonth === "month") {
        errors.push("Please select expiration month!");
    }
    if (expYear === "year") {
        errors.push("Please select expiration year!");
    }
    if (cvv.length !== 3 && cvv.length !== 4 || isNaN(cvv)) {
        errors.push("Invalid CVV!");
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}
