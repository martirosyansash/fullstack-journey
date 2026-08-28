import ProductCard from "./ProductCard";

function ProductsGrid({ product }) {
  return (
    <div className="products-grid">
      {product.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductsGrid;