import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";
import ProductCard from "../components/ProductCard";
function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
    
    return (
        <div>
            <h2>Products</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {products.map((product) => {
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