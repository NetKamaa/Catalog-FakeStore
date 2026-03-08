const fakeAPI = "https://fakestoreapi.com/products";

export async function loadAPI() {
  const response = await fetch(fakeAPI);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const data = await response.json();
  const fullData = data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      description: item.description,
    };
  });
  return fullData;
}
