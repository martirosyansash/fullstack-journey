import Product from "../models/product.js";
import buildProductsFilter from "../utils/buildProductsFilter.js";
import getProductsSort from "../utils/getProductsSort.js";
import { validateProductsQuery } from "../utils/validateProductsQuery.js";

export async function getProducts(request, response, next) {
    try {
        const {
                minPrice,
                maxPrice,
                sort,
                search,
                page,
                limit,
                category,
                inStock
            } = request.query;
        const validation = validateProductsQuery({
            minPrice,
            maxPrice,
            page,
            limit,
            sort,
            search,
            category,
            inStock
        });

        if (validation.error) {
            return response.status(400).json({
                message: validation.error
            });
        }
        
        const {
                minPriceNumber,
                maxPriceNumber,
                pageNumber,
                limitNumber,
                searchValue
            } = validation;

        const filter = buildProductsFilter({
            minPriceNumber,
            maxPriceNumber,
            searchValue,
            category,
            inStock
        })
        const sortOption = getProductsSort(sort);
        let query = Product.find(filter).sort(sortOption);
        const skip = (pageNumber - 1) * limitNumber;
        query = query.skip(skip).limit(limitNumber);

        const [products, totalProducts] = await Promise.all([
            query, Product.countDocuments(filter)
        ])
        const totalPages = Math.max(1, Math.ceil(totalProducts / limitNumber));
            
        response.json({
            products,
            pagination: {
                totalProducts,
                currentPage: pageNumber,
                totalPages,
                limit: limitNumber,
                hasNextPage: pageNumber < totalPages,
                hasPrevPage: pageNumber > 1
            }
        });
    } catch (error) { 
        next(error)
    }
}

export async function getProductById(request, response, next) {
    try {
        const id = request.params.id;
        const product = await Product.findById(id)
      
        if (!product) {
          return response
            .status(404)
            .json({ message: "Product not found" });
        }
        response.json(product);

    } catch (error) { 
        next(error)
    }
}

export async function createProduct(request, response, next) {
    try {
        const { name, price, description, category, stock } = request.body;
        if (name === undefined ||
            price === undefined ||
            description === undefined ||
            category === undefined ||
            stock === undefined)
        { 
            return response.status(400).json({
                message: "Name, price, category, stock and Description are required"
            })
        }
        const newProduct = await Product.create({
            name,
            price,
            description,
            category,
            stock
        })
        response.status(201).json(newProduct);
    } catch (error) { 
        next(error)
    }
}

export async function updateProduct(request, response, next) {
    try {
        const { id } = request.params;
        const allowedFields = [
            "name",
            "price",
            "description",
            "category",
            "stock"
        ];
        const fields = Object.keys(request.body);
        if (fields.some((field) => !allowedFields.includes(field))) { 
            return response.status(400).json({
                message: "One or more fields are not allowed"
            });
        };
        if (fields.length === 0) { 
            return response.status(400).json({
                message: "At least one field is required for update"
            })
        }
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            request.body,
            {
                new: true,
                runValidators:true
            }
        )
        
        if (!updateProduct) {
            return response.status(404).json({
                message: "Product not found"
            });
        }
        response.json(updateProduct);

    } catch (error) { 
        next(error)
    }
}

export async function deleteProduct(request, response, next) {
    try {
        const { id } = request.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) { 
            return response.status(404).json({ "message": "Product not found" }); 
        }
        response.status(200).json({message: "Product deleted"});
    } catch (error) { 
        next(error)
    }
}