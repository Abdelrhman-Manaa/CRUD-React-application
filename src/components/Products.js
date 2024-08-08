import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, []);

  return (
    <>
      <h1 className="all-products ">All products</h1>
      <div className="text-center mb-3">
        <Link to={"/product/add"} className="btn btn-success">
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
              <th>{product.description}</th>
              <td>{product.price}</td>
              <td>
                <Link className="btn btn-primary btn-sm">Edit</Link>
                <Link
                  to={`/Product/${product.id}`}
                  className="btn btn-info btn-sm"
                >
                  View
                </Link>
                <Link className="btn btn-danger btn-sm">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
