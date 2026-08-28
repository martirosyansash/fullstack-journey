import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function productsFetch() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    productsFetch();
  }, []);

  return {
    products,
    loading,  
    error
  };
}

export default useProducts;