const API = "https://dummyjson.com/products?limit=194";

export const getData = async (url) => {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  const request = await fetch(url);
  const data = await request.json();
  overlay.classList.add("hidden");
  return data;
};
getData(API)
  .then((data) => updateUI(data.products))
  .catch((error) => console.log(error));
