import { loadAPI } from "./api.js";

export const state = {
  items: [],
  status: "idle",
  error: "",
  query: "",
  category: "all",
  pageSize: 8,
  visibleCount: 8,
  favorites: new Set(),
  modalProductId: null,
};

const FAVORITES_STORAGE_KEY = "catalog:favorites";

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

export function loadFavorites() {
  const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!raw) {
    return [];
  }
  try {
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      return [];
    }

    const valIds = data.filter(
      (val) => typeof val === "number" && Number.isFinite(val),
    );

    return valIds;
  } catch (e) {
    return [];
  }
}
export function saveFavorites(favorites) {
  const favoritesIds = Array.from(favorites);
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritesIds));
}
