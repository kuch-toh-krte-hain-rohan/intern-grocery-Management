const shopItems = document.querySelector(".shop-items");

async function fetchVegetables() {
  const result = await fetch("/products/vegetables");
  const data = await result.json();

  data.forEach((vegetable) => {
    const card = document.createElement("div");
    card.className = "shop-item-card";
    card.innerHTML = `
        <span class="shop-item-tittle">${vegetable.name}</span>

        <img class="shop-item-image" src="imagers\\${vegetable.img}" height="250px" width="250px">
        <div class="shop-item-details">
            <span class="shop-item-price">${vegetable.price} Rs</span>
            <button class="btn btn-primary shop-item-button add-to-cart-btn" type="button">ADD TO CART</button>
        </div>
        `;

    card.querySelector(".add-to-cart-btn").addEventListener("click", () => {
      addToCart(vegetable.name, vegetable.price);
    });

    shopItems.appendChild(card);
  });
}

async function addToCart(name, price) {
  const res = await fetch("/add-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
    }),
  });

  if (!res.ok) {
    window.location.href = "/auth/login";
  } else {
    alert("item added to cart successfully");
  }
}

fetchVegetables();
