import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
  let { productId } = useParams();
  const [product, setProduct] = useState(null); // Initialize with null

  useEffect(() => {
    fetch(`http://localhost:9000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [productId]); // Add productId as a dependency to re-fetch on change

  return (
    <>
      <h1 className="text-center">Product Details: {productId}</h1>
      {product ? ( // Render product details if product is available
        <div>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p> {/* Example of additional data */}
        </div>
      ) : (
        <p>Loading...</p> // Display loading message while fetching
      )}
    </>
  );
}

export default Product;
