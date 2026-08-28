import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productsApi";

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    
    useEffect(() => { 
        async function loadProduct() { 
            try {
                setLoading(true);
                setError("");
                setProduct(null);
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                setError(error.message)
            } finally { 
                setLoading(false);
            }
        }
        loadProduct();
    },[id])
    
    return (
        <div>
            <Link to={`/`}>← Back to Products</Link>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {product && (
            <div>
                <h2>{product.title}</h2>
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
            </div>
            )}
        </div>
    )
        
}

export default ProductDetails;