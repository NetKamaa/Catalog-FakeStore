import {
  getCategories,
  getFilteredProducts,
  getPagedProducts,
} from "./utils.js";

export function render(state, elements) {
  const mode = getViewMode(state);

  renderStatus(mode, state.error, elements.api_status);

  if (mode === "grid") {
    const categories = getCategories(state.items);

    renderCategories(categories, elements.change, state);

    elements.favoriteCount.textContent = `Favorites: ${state.favorites.size}`;

    const filteredItems = getFilteredProducts(
      state.items,
      state.query,
      state.category,
    );

    const pagedItems = getPagedProducts(filteredItems, state.visibleCount);

    const loadMore = pagedItems.length < filteredItems.length;
    elements.btnLoadMore.disabled = !loadMore;

    renderProducts(pagedItems, elements.catalog, state.favorites);

    renderModal(state);
  }
}

function renderProducts(items, catalog, favorites) {
  catalog.innerHTML = items
    .map(
      (item) =>
        `<div class ="card" data-id ="${item.id}"><button class ="favorite ${favorites.has(item.id) ? "active" : ""}">♥</button><img src="${item.image}" alt="${item.title}"><h3>${item.title}</h3><p>${item.price}</p><p>${item.description}</p></div>`,
    )
    .join("");
}

function getViewMode(state) {
  if (state.status === "loading") return "loading";
  if (state.status === "error") return "error";
  if (state.items.length === 0) return "empty";

  return "grid";
}

function renderStatus(mode, error, api_status) {
  switch (mode) {
    case "loading":
      api_status.innerHTML = "Loading...";
      break;

    case "error":
      api_status.innerHTML = `Error: ${error}`;
      break;

    case "empty":
      api_status.innerHTML = "Array is empty";
      break;

    case "grid":
      api_status.innerHTML = "";
      break;
  }
}

function renderCategories(categories, change, state) {
  change.innerHTML =
    `<option value="all">All categories</option>` +
    categories
      .map((category) => `<option value="${category}">${category}</option>`)
      .join("");

  change.value = state.category;
}

function renderModal(state) {
  const oldModal = document.querySelector(".modal-overlay");
  if (oldModal) oldModal.remove();

  if (state.modalProductId === null) return;

  const product = state.items.find((item) => item.id === state.modalProductId);

  if (!product) return;

  const modalHTML = `
    <div class="modal-overlay">
      <div class="modal">
        <button class="modal-close">x</button>

        <img src="${product.image}" alt="${product.title}">

        <h2>${product.title}</h2>

        <p>Price: ${product.price}</p>

        <p>${product.description}</p>

        <p>Category: ${product.category}</p>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = scrollBarWidth + "px";
}
