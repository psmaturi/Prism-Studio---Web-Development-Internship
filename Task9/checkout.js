let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout() {
  const container = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const finalTotalEl = document.getElementById("final-total");
  const shippingInfo = document.getElementById("shipping-info");

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <span>${item.name} (₹${item.price})</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    container.appendChild(div);
    subtotal += item.price;
  });

  subtotalEl.textContent = subtotal.toFixed(2);

  const shipping = subtotal >= 500 ? 0 : 50;
  shippingEl.textContent = shipping.toFixed(2);
  finalTotalEl.textContent = (subtotal + shipping).toFixed(2);

  // Show free shipping badge
  if (shipping === 0) {
    shippingInfo.innerHTML += ` <span class="badge">🎉 Free Shipping</span>`;
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCheckout();
}

document.getElementById("place-order").addEventListener("click", () => {
  // Animate success
  const success = document.getElementById("success-message");
  success.classList.add("show");

  // Clear cart
  localStorage.removeItem("cart");
  cart = [];

  // Delay reload or redirect
  setTimeout(() => {
    success.classList.remove("show");
    renderCheckout();
  }, 2500);
});

renderCheckout();
