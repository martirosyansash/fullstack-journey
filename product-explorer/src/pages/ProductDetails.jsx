import { useParams, Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";

function ProductDetails() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    
   return (
    <div className="details-page">
        <Link className="back-link" to="/">
        ← Back to Products
        </Link>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {product && (
        <div className="product-details">
            <div className="details-image-wrapper">
            <img
                src={product.thumbnail}
                alt={product.title}
            />
            </div>

            <div className="details-content">
            <p className="product-category">
                {product.category}
            </p>

            <h2>{product.title}</h2>

            <p className="details-description">
                {product.description}
            </p>

            <p className="details-price">
                ${product.price}
            </p>
            </div>
        </div>
        )}
    </div>
    );
        
}

export default ProductDetails;