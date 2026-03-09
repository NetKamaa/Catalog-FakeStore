import { elements } from "./elements.js";
import { setupSearchHandler } from "./handlers.js";
import { render } from "./render.js";
import { loadProducts, state } from "./state.js";

async function init() {
  state.status = "loading";
  render(state, elements);

  await loadProducts();

  setupSearchHandler(state, elements, render);
  render(state, elements);
}

init();
