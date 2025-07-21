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
<img width="1907" height="981" alt="image" src="https://github.com/user-attachments/assets/31afc25f-6bda-4453-b6a4-51b6783f0c11" />
<img width="1914" height="980" alt="image" src="https://github.com/user-attachments/assets/8f81d33c-1285-4cf2-911e-80bf48fe957e" />
<img width="1904" height="975" alt="image" src="https://github.com/user-attachments/assets/1ffa90e8-ab1e-4c59-a7e6-73a2ac5ba03f" />
---

## 👨‍💻 Submitted by

**Maturi Pardha Saradhi**  
Web Development Intern @ Prism Studio  
[LinkedIn Profile](www.linkedin.com/in/psmaturi)

---

## 📧 Contact

📩 psmaturi@gmail.com

