function ProductsControls({ search, setSearch, sort, setSort, category, setCategory}) { 
    return (
        <div className="product-controls">
            <input
                type="text"
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}
                placeholder="Search products..."
            />
            <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}>
                <option value="">Sort by</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
            </select>
            <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}>
                <option value="all">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
            </select>
        </div>
    )
}

export default ProductsControls;