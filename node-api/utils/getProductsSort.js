export default function getProductsSort(sort) {
  if (sort === "low") {
    return { price: 1 };
  } else if (sort === "high") {
    return { price: -1 };
  } else if (sort === "oldest") {
    return { createdAt: 1 };
  } else if (sort === "newest") {
    return { createdAt: -1 };
  } else {
    return { _id: 1 };
  }
}