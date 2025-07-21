const products = [
  {
    id: 1,
    name: "Fashion Sneakers",
    price: 49.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Classic Wristwatch",
    price: 29.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1619946928632-abefa12506e2?q=80&w=732&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "MacBook Pro",
    price: 1299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    name: "Air Conditioner",
    price: 499.00,
    category: "Electronics",
    image: "https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Smart LED TV 55\"",
    price: 749.00,
    category: "Electronics",
    image: "https://plus.unsplash.com/premium_photo-1682274001252-cd39d7158ae3?w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Gaming Monitor",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1613749030206-9f59d27a28b8?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "NextGen Gaming Console",
    price: 399.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1683823363200-5857de737eb5?q=80&w=1974&auto=format&fit=crop"
  }
];

let cart = [];

function renderProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = "";

  products.forEach(product => {
    const isInCart = cart.some(item => item.id === product.id);

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})" ${isInCart ? "disabled" : ""}>
        ${isInCart ? "In Cart" : "Add to Cart"}
      </button>
    `;
    container.appendChild(card);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!cart.some(item => item.id === productId)) {
    cart.push({ ...product, quantity: 1 });
    updateCart();
    renderProducts(); // Refresh product buttons
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  renderProducts(); // Re-enable add button
}

function updateCart() {
  const itemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  itemsContainer.innerHTML = '';
  let total = 0, count = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.name} (₹${item.price})</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    itemsContainer.appendChild(itemDiv);
    total += item.price;
    count++;
  });

  cartCount.textContent = count;
  cartTotal.textContent = `₹${total.toFixed(2)}`;
}

function toggleCart() {
  document.getElementById("cart-sidebar").classList.toggle("show");
}

renderProducts();
