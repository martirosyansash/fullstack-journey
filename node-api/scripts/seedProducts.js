import "dotenv/config"

import { connectDB } from "../config/db.js"
import Product from "../models/product.js"
import products from "../data/products.js"

await connectDB();

await Product.deleteMany();

await Product.insertMany(products)

console.log("Products seeded");

process.exit(0);