import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/productsApi.js";
import { Link } from "react-router-dom";

function ProductDetailsPage() {
  // URL-ից վերցնում ենք :id-ն
  const { id } = useParams();

  // 3 state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
        setError("");

      try {

          const data = await getProductById(id);
          setProduct(data);
      } catch (error) {
          setError(error.message);

      } finally {
          setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
      <Link to="/">← Back to Products</Link>
    </div>
  );
}

export default ProductDetailsPage;