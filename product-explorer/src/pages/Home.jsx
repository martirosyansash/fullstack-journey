import { useEffect, useState } from "react";
import ProductsControls from "../components/ProductControls";
import ProductsGrid from "../components/ProductsGrid";
import useProducts from "../hooks/useProducts";
function Home() {
    const { products, loading, error } = useProducts();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("");
    

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
        <div className="home-page">
            <h2>Products</h2>
            <ProductsControls
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                category={category}
                setCategory={setCategory}
            />
            {!loading && !error && sortedProducts.length === 0 && (
                <p>No products found.</p>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ProductsGrid
                product={sortedProducts}
            />
        </div>
    );
}

export default Home;