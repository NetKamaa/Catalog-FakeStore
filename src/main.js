import { render } from "./render.js";
import { loadProducts } from "./state.js";

async function init() {
  render();
  await loadProducts();
  render();
}

init();
