import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [newId, setNewId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9000/products")
      .then((response) => {
        const products = response.data;
        const maxId = Math.max(...products.map((product) => product.id));
        setNewId(maxId + 1); // Set new ID as the last ID + 1
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const FormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/products", {
        id: newId, // Use the new ID
        title,
        description,
        price,
      })
      .then((response) => {
        navigate("/Product");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <>
      <h1 className="text-center">Add New Product</h1>
      <div className="mb-3">
        <form onSubmit={FormSubmit}>
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
            Add New Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
