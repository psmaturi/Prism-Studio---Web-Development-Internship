const API_BASE = "https://api.coingecko.com/api/v3";
let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

const searchInput = document.getElementById("search");
const suggestions = document.getElementById("suggestions");
const watchlistContainer = document.getElementById("watchlist");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const closeBtn = document.getElementById("close");
let chart;

// 📌 Request notification permission on load
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// 🔍 Live search for coins
searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return (suggestions.innerHTML = "");

  const res = await fetch(`${API_BASE}/search?query=${query}`);
  const data = await res.json();
  suggestions.innerHTML = "";

  data.coins.slice(0, 10).forEach((coin) => {
    const li = document.createElement("li");
    li.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;
    li.onclick = () => {
      if (!watchlist.includes(coin.id)) {
        watchlist.push(coin.id);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        renderWatchlist();
      }
      suggestions.innerHTML = "";
      searchInput.value = "";
    };
    suggestions.appendChild(li);
  });
});

// 📄 Render watchlist
function renderWatchlist() {
  watchlistContainer.innerHTML = "";

  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `<div>No assets in watchlist</div>`;
    return;
  }

  fetch(`${API_BASE}/simple/price?ids=${watchlist.join(",")}&vs_currencies=usd&include_24hr_change=true`)
    .then((res) => res.json())
    .then((data) => {
      watchlist.forEach((id) => {
        const coin = data[id];
        if (!coin) return;

        const portfolioData = JSON.parse(localStorage.getItem(`portfolio-${id}`)) || { quantity: 0, buyPrice: 0 };
        const currentValue = coin.usd * portfolioData.quantity;
        const profitLoss = portfolioData.buyPrice > 0
          ? (((coin.usd - portfolioData.buyPrice) / portfolioData.buyPrice) * 100).toFixed(2)
          : "N/A";

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <span class="remove" onclick="removeAsset('${id}')">&times;</span>
          <h3>${id.charAt(0).toUpperCase() + id.slice(1)}</h3>
          <div class="price">$${coin.usd.toLocaleString()}</div>
          <div class="percent">${coin.usd_24h_change.toFixed(2)}%</div>
          <hr />
          <div><strong>Quantity:</strong> ${portfolioData.quantity}</div>
          <div><strong>Buy @:</strong> $${portfolioData.buyPrice}</div>
          <div><strong>Value:</strong> $${currentValue.toFixed(2)}</div>
          <div><strong>P/L:</strong> ${profitLoss}%</div>
          <button onclick="event.stopPropagation(); editPortfolio('${id}')">Edit Portfolio</button>
          <button onclick="event.stopPropagation(); setPriceAlert('${id}', ${coin.usd})">Set Alert</button>
        `;
        card.onclick = () => drawChart(id);
        watchlistContainer.appendChild(card);
      });
    });
}

// ✏️ Edit portfolio (quantity & buy price)
function editPortfolio(id) {
  const quantity = parseFloat(prompt(`Enter quantity owned for ${id}:`)) || 0;
  const buyPrice = parseFloat(prompt(`Enter buy price:`)) || 0;
  localStorage.setItem(`portfolio-${id}`, JSON.stringify({ quantity, buyPrice }));
  renderWatchlist();
}

// ❌ Remove asset
function removeAsset(id) {
  watchlist = watchlist.filter((coin) => coin !== id);
  localStorage.removeItem(`portfolio-${id}`);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  renderWatchlist();
}

// 📊 Show 7-day chart
function drawChart(asset) {
  fetch(`${API_BASE}/coins/${asset}/market_chart?vs_currency=usd&days=7`)
    .then((res) => res.json())
    .then((data) => {
      const ctx = document.getElementById("chartCanvas").getContext("2d");
      const labels = data.prices.map((p) => new Date(p[0]).toLocaleDateString());
      const prices = data.prices.map((p) => p[1]);

      if (chart) chart.destroy();
      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: `${asset.toUpperCase()} Price (USD)`,
            data: prices,
            borderColor: "#10b981",
            fill: true,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: false } }
        }
      });

      modal.style.display = "block";
      modalTitle.innerText = `${asset.toUpperCase()} Price Chart`;
    });
}

// 🔘 Modal handling
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// 🔔 Set alert
function setPriceAlert(id, currentPrice) {
  const target = parseFloat(prompt(`Set alert for ${id.toUpperCase()} (current: $${currentPrice}):`));
  if (!target || isNaN(target)) return;
  const alerts = JSON.parse(localStorage.getItem("alerts") || "{}");
  alerts[id] = target;
  localStorage.setItem("alerts", JSON.stringify(alerts));
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      alert(`Alert set! You’ll be notified when ${id.toUpperCase()} crosses $${target}`);
    }
  });
}

// 🔁 Check alerts every 30 seconds (after permission granted)
Notification.requestPermission().then(permission => {
  if (permission === "granted") {
    setInterval(checkAlerts, 30000);
  }
});

// 🔎 Check alerts logic
function checkAlerts() {
  console.log("🚨 checkAlerts() called...");

  const alerts = JSON.parse(localStorage.getItem("alerts") || "{}");
  console.log("📦 Current alerts:", alerts);

  if (Object.keys(alerts).length === 0) {
    console.log("❌ No alerts found.");
    return;
  }

  const ids = Object.keys(alerts).join(",");
  fetch(`${API_BASE}/simple/price?ids=${ids}&vs_currencies=usd`)
    .then(res => res.json())
    .then(data => {
      console.log("📈 Live prices:", data);

      for (let id in alerts) {
        const target = alerts[id];
        const current = data[id]?.usd;
        console.log(`🔍 ${id.toUpperCase()} → Current: $${current}, Target: $${target}`);

        if (current >= target) {
          console.log(`✅ Alert Triggered for ${id.toUpperCase()}!`);
          new Notification(`${id.toUpperCase()} Alert 🚨`, {
            body: `${id.toUpperCase()} reached $${current} (target: $${target})`,
            icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026"
          });

          delete alerts[id];
          localStorage.setItem("alerts", JSON.stringify(alerts));
        } else {
          console.log(`⏳ No alert yet for ${id.toUpperCase()}`);
        }
      }
    })
    .catch(err => console.error("⚠️ Fetch error:", err));
}


// ✅ Initial load
renderWatchlist();
