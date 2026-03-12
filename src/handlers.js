let debounceTimer;

export function setupSearchHandler(state, elements, render) {
  elements.input_query.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      state.query = elements.input_query.value;
      state.visibleCount = state.pageSize;
      render(state, elements);
    }, 300);
  });

  elements.change.addEventListener("change", () => {
    state.category = elements.change.value;
    state.visibleCount = state.pageSize;
    render(state, elements);
  });

  elements.btnReset.addEventListener("click", () => {
    state.query = "";
    state.category = "all";

    elements.input_query.value = "";
    elements.change.value = "all";

    state.visibleCount = state.pageSize;

    render(state, elements);
  });

  elements.btnLoadMore.addEventListener("click", () => {
    state.visibleCount += state.pageSize;

    render(state, elements);
  });

  elements.catalog.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (!card) return;

    const id = Number(card.dataset.id);

    if (e.target.closest(".favorite")) {
      toggleFavorite(id);
    } else {
      openModal(id);
    }

    render(state, elements);
  });

  function toggleFavorite(id) {
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
    } else {
      state.favorites.add(id);
    }
    render(state, elements);
  }

  function openModal(id) {
    state.modalProductId = id;
  }

  document.addEventListener("click", (e) => {
    if (
      e.target.closest(".modal-close") ||
      e.target.classList.contains("modal-overlay")
    ) {
      state.modalProductId = null;
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      render(state, elements);
    }
  });
}
