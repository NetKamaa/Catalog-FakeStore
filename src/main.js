import { elements } from "./elements.js";
import { setupSearchHandler } from "./handlers.js";
import { render } from "./render.js";
import { loadFavorites, loadProducts, state } from "./state.js";

async function init() {
  state.status = "loading";
  state.favorites = new Set(loadFavorites());
  render(state, elements);

  await loadProducts();

  setupSearchHandler(state, elements, render);
  render(state, elements);
}

init();
