import { useState, useContext } from "react";
import { deleteProduct, updateProduct } from "../api/productsApi";
import { AuthContext } from "../context/AuthContext.js";
import { Link } from "react-router-dom";

function ProductCard({ product, onProductDeleted, onProductUpdated }) {
    const {user} = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(product.name);
    const [editPrice, setEditPrice] = useState(product.price);
    const [editDescription, setEditDescription] = useState(product.description);
    const [editCategory, setEditCategory] = useState(product.category);
    const [editStock, setEditStock] = useState(product.stock);
    const [editError, setEditError] = useState("");
    async function handleDelete() {
        try {
            const confirmed = window.confirm(`Are you sure you want to delete "${product.name}"?`);
            if (!confirmed) {
                return;
            }
            await deleteProduct(product._id, user.token);
            onProductDeleted(product._id);
        } catch (error) {
            console.error(error);
        }
    }
    async function handleEdit(event) {
        event.preventDefault();
        setEditError("");
           try {
            const editData = {
                name: editName,
                price: Number(editPrice),
                description: editDescription,
                category: editCategory,
                stock: Number(editStock)
            };

            const data = await updateProduct(
                product._id,
                editData,
                user.token
            );

            onProductUpdated(data);
            setIsEditing(false);
            } catch (error) {
            setEditError(error.message);
        }
    }
    function handleCancelEdit() {
        setEditName(product.name);
        setEditPrice(product.price);
        setEditDescription(product.description);
        setEditCategory(product.category);
        setEditStock(product.stock);

        setIsEditing(false);
    }
    return (
      <div className="product-card">
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <Link to={`/products/${product._id}`}>
            View Details
            </Link>
            {user?.role === "admin" && (
                <>
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <button onClick={handleDelete}>Delete</button>
                </>
            )}
            {isEditing && (
                <form onSubmit={handleEdit}>
                    <input
                        type="text"
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                    />
                    <input
                        type="number"
                        value={editPrice}
                        onChange={(event) => setEditPrice(event.target.value)}
                    />

                    <input
                        type="text"
                        value={editDescription}
                        onChange={(event) => setEditDescription(event.target.value)}
                    />

                    <select
                        value={editCategory}
                        onChange={(event) => setEditCategory(event.target.value)}>
                        <option value="food">Food</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="cars">Cars</option>
                    </select>

                    <input
                        type="number"
                        value={editStock}
                        onChange={(event) => setEditStock(event.target.value)}
                    />

                    <button type="submit">Save</button>

                    <button
                        type="button"
                        onClick={handleCancelEdit}
                    >
                    Cancel
                    </button>
                    {editError && <p>{editError}</p>}
                </form>
            )}
        </div>
  )
}

export default ProductCard;