
let cart = [];
let products = []; 


async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    products = await response.json();
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();

function addToCart(productId) {
  if (!products || products.length === 0) {
    console.error('Products data is empty or undefined.');
    return;
  }

  productId = Number(productId);
  const product = products.find((product) => product.id === productId);

  if (!product || !product.id) {
    console.error("Product not found or missing 'id' property.");
    return;
  }

  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  displayCart();
}

const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.dataset.productId;
    addToCart(productId);
  });
});

function displayCart() {
  const cartContainer = document.querySelector(".cart-items");

  cartContainer.innerHTML = "";

  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.textContent = "Your cart is empty.";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      if (item.img) {
        const productImage = document.createElement("img");
        productImage.src = item.img;
        productImage.alt = item.productname;
        productImage.classList.add("cart-item-img");
        cartItem.appendChild(productImage);
      }

      const itemDetails = document.createElement("div");
      itemDetails.classList.add("cart-item-info");

      const itemNamePrice = document.createElement("span");
      itemNamePrice.textContent = `${item.productname} - $${item.price}`;
      itemNamePrice.classList.add("cart-item-name-price");
      itemDetails.appendChild(itemNamePrice);

      const itemCount = document.createElement("span");
      itemCount.textContent = `Quantity: ${item.quantity}`;
      itemCount.classList.add("cart-item-quantity");
      itemDetails.appendChild(itemCount);

      const itemButtons = document.createElement("div");
      itemButtons.classList.add("cart-item-buttons");

      const PlusBtn = document.createElement("button");
      PlusBtn.textContent = "+";
      PlusBtn.addEventListener("click", () => {
        addToCart(item.id);
      });
      itemButtons.appendChild(PlusBtn);

      const MinusBtn = document.createElement("button");
      MinusBtn.textContent = "-";
      MinusBtn.addEventListener("click", () => {
        removeFromCart(item);
      });
      itemButtons.appendChild(MinusBtn);

      const RemoveBtn = document.createElement("button");
      RemoveBtn.textContent = "Remove";
      RemoveBtn.addEventListener("click", () => {
        removeAllFromCart(item);
      });
      itemButtons.appendChild(RemoveBtn);

      itemDetails.appendChild(itemButtons);
      cartItem.appendChild(itemDetails);
      cartContainer.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });
  }

  const cartTotalElement = document.querySelector("#cart-total");
  cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}








function removeFromCart(item) {
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      cart.splice(itemIndex, 1);
    }
    updateCartUI();
    displayCart();
  } else {
    console.error('Item not found in the cart:', item);
  }
}

function removeAllFromCart(item) {
  cart = cart.filter((cartItem) => cartItem.id !== item.id);
  updateCartUI();
  displayCart();
}



function updateCartUI() {
  const cartCount = document.querySelector(".cart-count");
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalQuantity.toString();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add products to your cart first.");
  } else {
    alert("Thanks for purchasing");
    cart = [];
    updateCartUI();
    displayCart();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const cartBtn = document.querySelector(".cart-info");
  const cartOverlay = document.querySelector("#cart-overlay");
  const cartCloseBtn = document.querySelector("#cart-close");
  const cartSymbol = document.querySelector(".cart-count");

  cartBtn.addEventListener("click", function () {
    cartOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  cartSymbol.addEventListener("click", function () {
    cartOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  cartCloseBtn.addEventListener("click", function () {
    cartOverlay.style.display = "none";
    document.body.style.overflow = "";
  });

 

  const checkoutBtnCart = document.querySelector("#checkout-btn-cart");
  checkoutBtnCart.addEventListener("click", checkout);
});
