import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { title, description, price };

    fetch(`http://localhost:9000/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then(() => navigate("/"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <h1>Edit Product</h1>
      {product ? (
        <form onSubmit={handleSubmit}>
          <label className="form-label">Name:</label>
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
            Update Product
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default EditProduct;
