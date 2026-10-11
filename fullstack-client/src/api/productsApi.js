const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts({
  search,
  category,
  sort,
  inStock,
  page
}) {
  const params = new URLSearchParams();

  params.append("limit", 2);

  if (search) {
    params.append("search", search);
  }

  if (category) {
    params.append("category", category);
  }

  if (sort) {
    params.append("sort", sort);
  }

  if (inStock) {
    params.append("inStock", inStock);
  }

    params.append("page", page);

    const queryString = params.toString();

    const url = queryString
            ? `${API_URL}/products?${queryString}`
            : `${API_URL}/products`;
    
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
    } 
    return data;
}

export async function createProduct(productData, token) {
    const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create product");
    } 
    return data;
}

export async function deleteProduct(productId, token) {
     const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
    } 
    return data;
}

export async function updateProduct(productId, productData, token) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
    } 
    return data;
}

export async function getProductById(productId) {
  const response = await fetch(`${API_URL}/products/${productId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product");
  }

  return data;
}