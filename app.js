document.addEventListener("DOMContentLoaded", function () {
  const mostPopularContainer = document.getElementById(
    "most-popular-container"
  );
  const onSaleContainer = document.getElementById("on-sale-container");

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;

      const mostPopularProducts = products.slice(0, 20);
      mostPopularProducts.forEach((product) => {
        mostPopularContainer.innerHTML += `
                    <div class="product">
                        <img src="${product.thumbnail}" alt="${product.title}">
                        <p>${product.title}</p>
                        <p>Rp ${product.price}</p>
                        <p>⭐⭐⭐⭐☆</p>
                        <a href="#" class="button">Shop Now</a>
                    </div>
                `;
      });

      const onSaleProducts = products.slice(20, 25);
      onSaleProducts.forEach((product) => {
        onSaleContainer.innerHTML += `
                    <div class="product">
                        <img src="${product.thumbnail}" alt="${product.title}">
                        <p>${product.title}</p>
                        <p><s>Rp ${product.price + 50000}</s> Rp ${
          product.price
        }</p> <!-- Example discount -->
                        <p>⭐⭐⭐⭐☆</p>
                        <a href="#" class="button">Shop Now</a>
                    </div>
                `;
      });

      initializeCarousel(
        "most-popular-container",
        "most-popular-prev",
        "most-popular-next"
      );
      initializeCarousel("on-sale-container", "on-sale-prev", "on-sale-next");
    })
    .catch((error) => console.error("Error fetching data:", error));

  function initializeCarousel(containerId, prevButtonId, nextButtonId) {
    const container = document.getElementById(containerId);
    const prevButton = document.getElementById(prevButtonId);
    const nextButton = document.getElementById(nextButtonId);

    let currentIndex = 0;

    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel(container, currentIndex);
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentIndex < container.children.length - 1) {
        currentIndex++;
        updateCarousel(container, currentIndex);
      }
    });

    function updateCarousel(container, currentIndex) {
      const offset = -currentIndex * container.children[0].offsetWidth;
      container.style.transform = `translateX(${offset}px)`;
    }
  }
});
//About qismga otish
async function fetchProductById(productId) {
  const response = await fetch(`https://dummyjson.com/products/${productId}`);
  const product = await response.json();
  return product;
}

function displayProductDetails(product) {
  document.getElementById("product-img").src = product.thumbnail;
  document.getElementById("product-title").textContent = product.title;
  document.getElementById("breadcrumb-title").textContent = product.title;
  document.getElementById("original-price").textContent = `Rp ${product.price}`;
  document.getElementById("discounted-price").textContent = `Rp ${(
    product.price * 0.5
  ).toFixed(3)}`;
  document.getElementById("discount-tag").textContent = "Disc 50%";

  const sizes = ["38", "39", "40", "41", "42"];
  const sizesContainer = document.getElementById("sizes");
  sizes.forEach((size) => {
    const sizeButton = document.createElement("button");
    sizeButton.textContent = size;
    sizesContainer.appendChild(sizeButton);
  });
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
  fetchProductById(productId).then((product) => displayProductDetails(product));
}
