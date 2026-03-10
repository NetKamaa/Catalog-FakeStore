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

    const filteredItems = getFilteredProducts(
      state.items,
      state.query,
      state.category,
    );

    const pagedItems = getPagedProducts(filteredItems, state.visibleCount);

    const loadMore = pagedItems.length < filteredItems.length;
    elements.btnLoadMore.disabled = !loadMore;

    renderProducts(pagedItems, elements.catalog);
  }
}

function renderProducts(items, catalog) {
  catalog.innerHTML = items
    .map(
      (item) =>
        `<div class = "card"><img src="${item.image}" alt="${item.title}"><h3>${item.title}</h3><p>${item.price}</p><p>${item.description}</p></div>`,
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
