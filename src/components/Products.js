import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/products`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:9000/products/${id}`, { method: "DELETE" })
      .then(() => setProduct(products.filter((product) => product.id !== id)))
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <>
      <h1 className="all-products">All products</h1>
      <div className="text-center mb-3">
        <Link to="/product/add" className="btn btn-success">
          Add New Product
        </Link>
      </div>
      <table className="table table-dark table-striped text-center">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th>{product.id}</th>
              <td>{product.title}</td>
              <td>
                {product.description.length > 100
                  ? product.description.slice(0, 100) + "..."
                  : product.description}
              </td>
              <td>{product.price}</td>
              <td>
                <Link
                  to={`/product/edit/${product.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </Link>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-info btn-sm"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
