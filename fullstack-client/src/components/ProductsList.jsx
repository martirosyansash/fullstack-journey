import ProductCard from "./ProductCard.jsx";
function ProductsList({ products, onProductDeleted, onProductUpdated }) {
    return (
        <div className="products-grid">
        {products.map((product) => (
            <ProductCard
                product={product}
                onProductDeleted={onProductDeleted}
                onProductUpdated={onProductUpdated}
                key={product._id}
            />
      ))}
      </div>
  )
}

export default ProductsList;