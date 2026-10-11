import { useState } from "react";
import { createProduct } from "../api/productsApi";
function CreateProductForm({ token, onProductCreated }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("electronics");
    const [stock, setStock] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess("");
        try {
            const productData = {
                name,
                price: Number(price),
                description,
                category,
                stock: Number(stock)
            };
            const data = await createProduct(productData,token)
            onProductCreated(data);
            setSuccess("Product created successfully!");
            setName("");
            setPrice("");
            setDescription("");
            setCategory("electronics");
            setStock("")
                
            console.log("Created product:", data);
        } catch (error) {
            setError(error.message);
        }
    }
  return (
    <div>
          <h2>Create Product</h2>
          {success && <p>{ success }</p>}
          {error && <p>{ error }</p>}
          <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            </label>
            <label>
                Price:
                <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                />
            </label>
            <label>
                Description:
                <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                />
              </label>
            <label>
                Category:
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value="food">Food</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="cars">Cars</option>
                </select>
            </label>
            <label>
                Stock:
                <input
                type="number"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                />
              </label>
              <button type="submit">Create</button>
          </form>
    </div>
  );
}

export default CreateProductForm;