export default function buildProductsFilter({
    minPriceNumber,
    maxPriceNumber,
    searchValue,
    category,
    inStock
}) { 

    const filter = {};
    if (minPriceNumber !== undefined || maxPriceNumber !== undefined) {
        filter.price = {};
        if (minPriceNumber !== undefined) {
            filter.price.$gte = minPriceNumber;
        }

        if (maxPriceNumber !== undefined) {
            filter.price.$lte = maxPriceNumber;
        }
    }
    if (category !== undefined) {
        filter.category = category;
    }
    if (inStock === "true") {
        filter.stock = {$gt:0};
    }
    if (inStock === "false") {
        filter.stock = 0;
    }
    if (searchValue) { 
        filter.name = {
            $regex:searchValue,
            $options: "i"
        }
    }
    return filter;
}