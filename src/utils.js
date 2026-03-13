export function getFilteredProducts(items, query, category, favorites) {
  return items
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    .filter((item) => {
      if (category === "all") return true;

      if (category === "favorites") {
        return favorites.has(item.id);
      }

      return item.category === category;
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
