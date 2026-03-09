let debounceTimer;

export function setupSearchHandler(state, elements, render) {
  elements.input_query.addEventListener("input", () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      state.query = elements.input_query.value;
      render(state, elements);
    }, 300);
  });

  elements.change.addEventListener("change", () => {
    state.category = elements.change.value;
    render(state, elements);
  });

  elements.reset.addEventListener("click", () => {
    state.query = "";
    state.category = "all";

    elements.input_query.value = "";
    elements.change.value = "all";

    render(state, elements);
  });
}
