import { Link } from "react-router-dom";

function ProductCard({ product }) { 
    return (
        <div>
            <img src={product.thumbnail} alt={product.title} />
            <p>{ product.title}</p>
            <p>${ product.price}</p>
            <p>{product.category}</p>
            <Link to={`/products/${product.id}`} >
                View Details
            </Link>
        </div>
    );
}

export default ProductCard;