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
