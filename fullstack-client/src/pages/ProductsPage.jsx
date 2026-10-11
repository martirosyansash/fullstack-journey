import { useContext, useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import CreateProductForm from "../components/CreateProductForm";
import { getProducts } from "../api/productsApi";
import { AuthContext } from "../context/AuthContext.js"; 

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const { user } = useContext(AuthContext);
  function handleProductCreated(newProduct) {
    setProducts((prevProducts) => [
      ...prevProducts,
      newProduct
    ]);
  }
  function handleProductDeleted(productId) {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  }
  function handleProductUpdated(updatedProduct) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id
          ? updatedProduct
          : product
      )
    );
    }
    
    useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError("");
      try {
        const data = await getProducts({
                            search: debouncedSearch,
                            category,
                            sort,
                            inStock,
                            page
                          });

        setProducts(data.products);
        setPagination(data.pagination);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [debouncedSearch, category, sort, inStock, page]);
    
    return (
        <div>
        <h1>Products</h1>
        <div className="filters">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <select
                value={category}
                onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
                }}
            >
                <option value="">All categories</option>
                <option value="food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="cars">Cars</option>
            </select>
            <select
                value={sort}
                onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
                }}
            >
                <option value="">Default sorting</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
            <label>
                <input
                type="checkbox"
                checked={inStock}
                onChange={(event) => {
                    setInStock(event.target.checked);
                    setPage(1);
                }}
                />
                In stock only
            </label>
            <button
                onClick={() => {
                    setSearch("");
                    setCategory("");
                    setSort("");
                    setInStock(false);
                    setPage(1);
                }}
                >
                Clear Filters
                    </button>
        </div>
      {user?.role === "admin" && (
          <CreateProductForm
          token={user.token} 
          onProductCreated={handleProductCreated}
          />
              )}
      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}
      
      {!loading && !error && products.length > 0 && (
        <ProductsList
          products={products}
          onProductDeleted={handleProductDeleted}
          onProductUpdated={handleProductUpdated}
          />
            )}
            {pagination && (
        <div className="pagination">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
    );
}

export default ProductsPage;