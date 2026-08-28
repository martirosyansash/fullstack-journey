import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";
import ProductCard from "../components/ProductCard";
function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("");
    
    useEffect(() => { 
        async function productsFetch() {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally { 
                setLoading(false)
            }    
        }
        productsFetch()
    }, [])

    useEffect(() => { 
        const id  = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => { 
            clearTimeout(id);
        }
    },[search])

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(debouncedSearch.trim().toLowerCase());

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });
    const sortedProducts = [...filteredProducts];
    
    if (sort === "low") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    return (
        <div>
            <h2>Products</h2>
            <input
                type="text"
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}
                placeholder="Search products..."
            />
            <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}>
                <option value="">Sort by</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
            </select>
            <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
            </select>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {sortedProducts.map((product) => {
                return (
                    <ProductCard
                        product={product}
                        key={product.id}
                        />
                    )
             })}
        </div>
    );
}

export default Home;