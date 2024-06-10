const body = document.querySelector("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");

darkBtn.addEventListener(`click`, () => {
  darkBtn.classList.add("hidden");
  darkBtn.classList.remove("hidden");
  body.classList.toggle("dark-mode");
});

lightBtn.addEventListener(`click`, () => {
  darkBtn.classList.remove("hidden");
  darkBtn.classList.add("hidden");
});
