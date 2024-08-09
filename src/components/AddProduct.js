import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newId, setNewId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing products to find the highest ID
    fetch("http://localhost:9000/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const lastId = Math.max(...data.map((product) => product.id));
          setNewId(lastId + 1);
        } else {
          setNewId(1); // Start with 1 if there are no products
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: newId, // Use the new ID
      title,
      description,
      price,
    };

    fetch("http://localhost:9000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <h1 className="text-center">Add New Product</h1>
      <div className="mb-3">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label>Description:</label>
          <br />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <label>Price:</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn btn-success">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
