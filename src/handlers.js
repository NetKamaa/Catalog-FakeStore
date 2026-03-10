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
}
