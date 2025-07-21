const products = [
  {
    name: "Fashion Sneakers",
    price: 49.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Wireless Headphones",
    price: 89.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Classic Wristwatch",
    price: 29.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1619946928632-abefa12506e2?q=80&w=732&auto=format&fit=crop"
  },
  {
    name: "MacBook Pro",
    price: 1299.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3Dhttps://media.istockphoto.com/id/1345501290/photo/portrait-of-a-successful-business-woman-working-with-macbook-pro-in-outside.webp?a=1&b=1"
  },
  {
    name: "Air Conditioner",
    price: 499.00,
    category: "Electronics",
    image: "https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?w=600&auto=format&fit=crop"
  },
  {
    name: "Smart LED TV 55\"",
    price: 749.00,
    category: "Electronics",
    image: "https://plus.unsplash.com/premium_photo-1682274001252-cd39d7158ae3?w=600&auto=format&fit=crop"
  },
  {
    name: "Gaming Monitor",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1613749030206-9f59d27a28b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nJTIwbW9uaXRlcnxlbnwwfHwwfHx8MA%3D%3Dhttps://media.istockphoto.com/id/1157159213/photo/powerful-personal-computer-gamer-rig-with-first-person-shooter-game-on-screen-monitor-stands.webp?a=1&b=1"
  },
  {
    name: "NextGen Gaming Console",
    price: 399.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1683823363200-5857de737eb5?q=80&w=1974&auto=format&fit=crop"
  }
];

let filter

let filteredProducts = [...products];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const priceSort = document.getElementById("priceSort");
const categoryButtons = document.querySelectorAll(".filter-btn");

function renderProducts(productArray) {
  productGrid.innerHTML = "";
  if (productArray.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productArray.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${product.category}</p>
    `;

    productGrid.appendChild(productCard);
  });
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  let result = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchText)
  );

  if (priceSort.value === "low-high") {
    result.sort((a, b) => a.price - b.price);
  } else if (priceSort.value === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  renderProducts(result);
}

searchInput.addEventListener("input", filterProducts);
priceSort.addEventListener("change", filterProducts);

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    if (category === "All") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(p => p.category === category);
    }
    filterProducts();
  });
});

// Initial render
renderProducts(products);
