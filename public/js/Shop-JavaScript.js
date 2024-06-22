const notyf = new Notyf({
  position: {
    x: 'right', // 'left' or 'right' or 'center'
    y: 'top', // 'top' or 'bottom'
  },
});
let cart = [];
let products = [];
let isCartFetched = false;

function redirectToLogin() {
  const notification = "Please log in to access this page.";
  window.location.href = `/auth/login?notification=${notification}`;
}

async function fetchCart() {
  try {
    if (!isCartFetched) {
      const response = await fetch("/user/api/cart");
      const data = await response.json();
      cart = data.map((item) => ({
        product: {
          id: Number(item.product.id), // Cast to number
          img: item.product.img,
          price: item.product.price,
          productname: item.product.productname,
        },
        quantity: item.quantity,
      }));
      console.log("Cart fetched:", cart);
      isCartFetched = true;
      displayCart();
      updateCartUI();
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}

async function updateCart(productId, quantity) {
  try {
    const response = await fetch("/user/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: String(productId), quantity }),
    });

    if (response.ok) {
      await fetchCart();
    } else {
      console.error("Error updating cart");
    }
  } catch (error) {
    console.error("Error updating cart:", error);
  }
}

async function fetchProducts() {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    products = await response.json();
    products = products.map((product) => ({
      ...product,
      id: Number(product.id), // Cast to number
    }));
    console.log("Products fetched:", products);
  } catch (error) {
    console.error(error);
  }
}

function addToCart(productId) {
  if (!products || products.length === 0) {
    console.error("Products data is empty or undefined.");
    return;
  }

  productId = Number(productId); // Cast to number
  const product = products.find((product) => product.id === productId);

  if (!product || !product.id) {
    console.error("Product not found or missing 'id' property.");
    return;
  }

  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
    updateCart(existingItem.product.id, existingItem.quantity);
    notyf.success("added successfully");
  } else {
    cart.push({ product, quantity: 1 });
    updateCart(product.id, 1);
    notyf.success("added successfully");
  }
  
  updateCartUI();
  displayCart();
}

function removeFromCart(item) {
  const itemIndex = cart.findIndex(
    (cartItem) => cartItem.product.id === Number(item.product.id)
  ); // Ensure IDs are compared as numbers
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
      updateCart(cart[itemIndex].product.id, cart[itemIndex].quantity);
    } else {
      cart.splice(itemIndex, 1);
      updateCart(item.product.id, 0);
    }
  } else {
    console.error("Item not found in the cart:", item);
  }
  updateCartUI();
  displayCart();
}

function removeAllFromCart(item) {
  cart = cart.filter(
    (cartItem) => cartItem.product.id !== Number(item.product.id)
  ); // Ensure IDs are compared as numbers
  updateCart(item.product.id, 0);
  updateCartUI();
  displayCart();
}

function displayCart() {
  const cartContainer = document.querySelector(".cart-items");
  const cartTotalElement = document.querySelector("#cart-total");

  if (!cartContainer || !cartTotalElement) {
    console.error("Cart container or total element not found");
    return;
  }

  cartContainer.innerHTML = "";

  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.textContent = "Your cart is empty.";
  } else {
    cart.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.product.id
      );
      if (!product) {
        console.error("Product not found for cart item:", item);
        return;
      }

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      if (product.img) {
        const productImage = document.createElement("img");
        productImage.src = product.img;
        productImage.alt = product.productname;
        productImage.classList.add("cart-item-img");
        cartItem.appendChild(productImage);
      }

      const itemDetails = document.createElement("div");
      itemDetails.classList.add("cart-item-info");

      const itemNamePrice = document.createElement("span");
      itemNamePrice.textContent = `${
        product.productname
      } - $${product.price.toFixed(2)}`;
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
        addToCart(product.id);
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

      totalPrice += product.price * item.quantity;
    });
  }

  cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function updateCartUI() {
  const cartCount = document.querySelector(".cart-count");
  if (!cartCount) {
    console.error("Cart count element not found");
    return;
  }
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalQuantity.toString();
}

async function checkout() {
  if (cart.length === 0) {
    notyf.error("Your cart is empty. Add products to your cart first.");
  } else {
    for (let item of cart) {
      await updateCart(item.product.id, 0);
    }
    cart = [];
    updateCartUI();
    displayCart();
    notyf.success("Thanks for purchasing");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
  fetchCart();

  const cartBtn = document.querySelector(".cart-info");
  const cartOverlay = document.querySelector("#cart-overlay");
  const cartCloseBtn = document.querySelector("#cart-close");
  const cartSymbol = document.querySelector(".cart-count");

  cartBtn.addEventListener("click", function () {
    cartOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    displayCart(); // Ensure cart is displayed when overlay is shown
  });

  cartSymbol.addEventListener("click", function () {
    cartOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
    displayCart(); // Ensure cart is displayed when overlay is shown
  });

  cartCloseBtn.addEventListener("click", function () {
    cartOverlay.style.display = "none";
    document.body.style.overflow = "";
  });

  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      addToCart(productId);
    });
  });

  const checkoutBtnCart = document.querySelector("#checkout-btn-cart");
  checkoutBtnCart.addEventListener("click", checkout);
});













document.addEventListener('DOMContentLoaded', function () {
  const isDarkMode = localStorage.getItem('darkModeEnabled') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
});













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