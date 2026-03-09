import { loadAPI } from "./api.js";

export const state = {
  items: [],
  status: "idle",
  error: "",
  query: "",
  category: "all",
};

export async function loadProducts() {
  state.status = "loading";
  try {
    const products = await loadAPI();
    state.items = products;
    state.status = "success";
  } catch (e) {
    state.status = "error";
    state.error = e.message;
  }
}
