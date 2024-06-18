let cart = [];

async function fetchProducts() {
  const productsData = [
    { id: 1, name: "Whey Protein Powder", price: 49.99, image: "../images/Protein powder.jpg" },
    { id: 2, name: "Creatine Monohydrate", price: 29.99, image: "../images/Creatine.jpg" },
    { id: 3, name: "BCAA (Branched-Chain Amino Acids)", price: 39.99, image: "../images/BCA.jpg" },
    { id: 4, name: "Pre-Workout Supplement", price: 69.99, image: "../images/pre workout.jpg" },
    { id: 5, name: "Gym Gloves", price: 49.99, image: "../images/gym gloves.jpg" },
    { id: 6, name: "Multivitamin", price: 121.99, image: "../images/1.jpg" },
    { id: 7, name: "Gym tools", price: 29.99, image: "../images/2.jpg" },
    { id: 8, name: "Glutamine Supplement", price: 49.99, image: "../images/4.avif" },
    { id: 9, name: "Bench", price: 4499.99, image: "../images/bench.webp" },
    { id: 10, name: "10 KG Dubmbells", price: 499.99, image: "../images/dumbells.jpg" },
    { id: 11, name: "Excercising Matt", price: 399.99, image: "../images/gym mat.avif" },
    { id: 12, name: "Training Shorts", price: 499.99, image: "../images/gym shorts.jpg" },
    { id: 13, name: "Flask 1000L", price: 599.99, image: "../images/gym_bottle_big.webp" },
    { id: 14, name: "Flask 600L", price: 399.99, image: "../images/Gym_bottle2.jpg" },
    { id: 15, name: "Flask 300L", price: 149.99, image: "../images/Gym_bottle3.png" },
    { id: 16, name: "Training T-shirt ", price: 349.99, image: "../images/training tshirts.jpg" },

  ];


  return productsData;
}

async function generateProductCards() {
  const productContainer = document.querySelector(".product-list");
  const products = await fetchProducts();

  products.forEach((product) => {
    const cardExists = productContainer.querySelector(
      `[data-id="${product.id}"]`
    );
    if (!cardExists) {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.dataset.id = product.id;

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;

      const name = document.createElement("h3");
      name.textContent = product.name;

      const price = document.createElement("p");
      price.textContent = `$${product.price}`;

      const addToCartBtn = document.createElement("button");
      addToCartBtn.textContent = "Add to Cart";

      addToCartBtn.addEventListener("click", () => {
        addToCart(product);
      });

      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(addToCartBtn);

      productContainer.appendChild(card);
    }
  });
}
function updateCartUI() {
  const cartCount = document.querySelector(".cart-count");
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalQuantity.toString();
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
  displayCart();
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
  }
}

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

      const productImage = document.createElement("img");
      productImage.src = item.image;
      productImage.alt = item.name;
      productImage.classList.add("cart-item-img");
      cartItem.appendChild(productImage);

      const itemDetails = document.createElement("div");
      itemDetails.classList.add("cart-item-info");

      const itemNamePrice = document.createElement("span");
      itemNamePrice.textContent = `${item.name} - $${item.price}`;
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
        addToCart(item);
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

function removeAllFromCart(item) {
  cart = cart.filter((cartItem) => cartItem.id !== item.id);
  updateCartUI();
  displayCart();
}

generateProductCards();

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Add products to your cart first.");
  } else {
    alert("Redirecting to checkout page...");
    cart = [];
    updateCartUI();
    displayCart();
  }
}

generateProductCards();

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

generateProductCards();
