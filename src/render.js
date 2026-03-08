import { state } from "./state.js";

const api_status = document.querySelector(".api-status");
const catalog = document.querySelector(".catalog");

export function render() {
  const mode = getViewMode();

  renderStatus(mode);

  if (mode === "grid") renderProducts();
}

function renderProducts() {
  catalog.innerHTML = state.items
    .map(
      (item) =>
        `<div class = "card"><img src="${item.image}" alt="${item.title}"><h3>${item.title}</h3><p>${item.price}</p><p>${item.description}</p></div>`,
    )
    .join("");
}

function getViewMode() {
  if (state.status === "loading") return "loading";
  if (state.status === "error") return "error";
  if (state.items.length === 0) return "empty";

  return "grid";
}

function renderStatus(mode) {
  switch (mode) {
    case "loading":
      api_status.innerHTML = "Loading...";
      break;

    case "error":
      api_status.innerHTML = `Error: ${state.error}`;
      break;

    case "empty":
      api_status.innerHTML = "Array is empty";
      break;

    case "grid":
      api_status.innerHTML = "";
      break;
  }
}
