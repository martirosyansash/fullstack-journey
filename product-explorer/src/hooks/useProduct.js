    import { useEffect, useState } from "react";
    import { getProductById } from "../services/productsApi";

    function useProduct(id) {
        const [product, setProduct] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        useEffect(() => { 
            async function loadProduct() { 
                try {
                    setLoading(true);
                    setError("");
                    setProduct(null);
                    const data = await getProductById(id);
                    setProduct(data);
                } catch (error) {
                    setError(error.message);
                    setProduct(null);
                } finally { 
                    setLoading(false);
                }
            }
            loadProduct();
        },[id])

    return {
        product,
        loading,
        error
    };
    }

    export default useProduct;