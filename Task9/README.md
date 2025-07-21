# 🛒 ShopEasy – Functional Checkout Page (Task 8)

## 📌 Overview

This project is a simulation of a real-world **e-commerce frontend** flow. Users can:

- Browse products
- Add items to the cart
- View a dynamic cart summary
- Proceed to a full **checkout experience**
- Place an order and reset the cart

Built using **HTML, CSS, and JavaScript** — without any backend, ideal for stakeholder demonstrations and internships.

---

## 🧩 Features Implemented

### ✅ Product Listing Page (`index.html`)
- Product cards with images, names, and prices
- "Add to Cart" button (disabled once added)
- Dynamic cart sidebar with:
  - Cart item list
  - Total price calculation
  - Remove from cart option
  - **Checkout** button added!

### ✅ Checkout Page (`checkout.html`)
- Cart loaded from `localStorage`
- Detailed product list with thumbnails, prices, and remove buttons
- Summary with:
  - Subtotal
  - Shipping charges:
    - ₹50 if subtotal < ₹500
    - Free if ≥ ₹500
  - Final total
- "Place Order" button:
  - Shows confirmation popup
  - Empties cart and redirects to home

---

## 💾 How It Works

1. **Add Items**: Go to `index.html` and add items to your cart.
2. **Click Checkout**: Opens `checkout.html` with saved cart details.
3. **Place Order**: Simulated order with success message + cart reset.

---

## 🧪 Technologies Used

- **HTML5** – Structure
- **CSS3** – Styling & responsive grid
- **Vanilla JavaScript** – Cart logic, DOM manipulation, localStorage

---

## 📁 File Structure

```
📁 ShopEasy/
├── index.html         # Main product listing
├── checkout.html      # Checkout page
├── style.css          # Styling for both pages
├── script.js          # Cart & product logic
└── README.md          # Project overview
```

---

## 🎁 Bonus Features

- ✅ Free shipping badge logic
- ✅ Cart saved in `localStorage`
- ✅ Smooth cart slide-in animation
- ✅ Cart persists across pages

---

## 📸 Preview

*(Insert screenshots or screen recording here if available)*

---

## 📣 Feedback

Feel free to share suggestions or improvements.  
This project was built as part of a **frontend internship assignment** to showcase dynamic UI skills using pure web technologies.

---
