import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="product-card-content">
        <p className="product-category">
          {product.category}
        </p>

        <h3>{product.title}</h3>

        <p className="product-price">
          ${product.price}
        </p>

        <Link
          className="details-link"
          to={`/products/${product.id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;