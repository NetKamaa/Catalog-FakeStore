export function getFilteredProducts(items, query, category) {
  return items
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => {
      if (category === "all") return true;
      else {
        return item.category === category;
      }
    });
}

export function getCategories(items) {
  const categories = items.map((item) => item.category);
  const set = new Set(categories);
  return [...set];
}

export function getPagedProducts(filteredItems, visibleCount) {
  const pagedItems = filteredItems.slice(0, visibleCount);
  return pagedItems;
}
