const fakeAPI = "https://fakestoreapi.com/products";

export async function loadAPI() {
  const response = await fetch(fakeAPI);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  const fullData = data.map((item) => {
    return {
      id: item.id ?? crypto.randomUUID(),
      title: item.title ?? "Untitled",
      image: item.image ?? "",
      price: item.price ?? "We are confirming the price",
      description: item.description ?? "Will be here soon",
      category: item.category ?? "We are confirming the category",
    };
  });
  return fullData;
}
