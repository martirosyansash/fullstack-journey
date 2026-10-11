export function validateProductsQuery({
  minPrice,
  maxPrice,
  page,
  limit,
  sort,
  search,
  category,
  inStock
}) {
  const validCategories = ["food", "electronics", "clothing", "cars"];
  const validStocks = ["false", "true"];
  const validSort = ["low", "high", "oldest", "newest"];
  if (inStock !== undefined && !validStocks.includes(inStock)) { 
    return {
      error: "inStock must be either false or true"
    }
  }
  if (category !== undefined && !validCategories.includes(category)) { 
    return {
      error:"thats not valid category"
    }
  }
  const searchValue =
  search !== undefined ? search.trim() : undefined;
  if (
    search !== undefined &&
    searchValue === ""
  ) {
    return {
      error: "search cannot be empty"
    };
  }
  if (sort !== undefined && !validSort
    .includes(sort)) {
    return {
      error: "sort must be low or high, newest or oldest"
    };
  }
  const minPriceNumber =
    minPrice !== undefined ? Number(minPrice) : undefined;

  const maxPriceNumber =
    maxPrice !== undefined ? Number(maxPrice) : undefined;

  const pageNumber = page ? Number(page) : 1;
  const limitNumber = limit ? Number(limit) : 10;

  if (
    minPriceNumber !== undefined &&
    Number.isNaN(minPriceNumber)
  ) {
    return {
      error: "minPrice must be a number"
    };
  }

  if (
    maxPriceNumber !== undefined &&
    Number.isNaN(maxPriceNumber)
  ) {
    return {
      error: "maxPrice must be a number"
    };
  }

  if (
    minPriceNumber !== undefined &&
    minPriceNumber < 0
  ) {
    return {
      error: "minPrice cannot be negative"
    };
  }

  if (
    maxPriceNumber !== undefined &&
    maxPriceNumber < 0
  ) {
    return {
      error: "maxPrice cannot be negative"
    };
  }

  if (
    minPriceNumber !== undefined &&
    maxPriceNumber !== undefined &&
    minPriceNumber > maxPriceNumber
  ) {
    return {
      error: "minPrice cannot be greater than maxPrice"
    };
  }

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1
  ) {
    return {
      error: "Page must be a positive integer"
    };
  }

  if (
    !Number.isInteger(limitNumber) ||
    limitNumber < 1
  ) {
    return {
      error: "Limit must be a positive integer"
    };
  }
  if (limitNumber > 50) { 
    return {
      error: "Limit cannot be greater than 50"
    }
  }

  return {
    minPriceNumber,
    maxPriceNumber,
    pageNumber,
    limitNumber,
    searchValue
  };
}