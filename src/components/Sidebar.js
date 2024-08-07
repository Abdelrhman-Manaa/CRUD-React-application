import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="list-unstyled">
        <li>
          <Link to="Home">Home</Link>
        </li>
        <li>
          <Link to={"About"}>About</Link>
        </li>
        <li>
          <Link to="Product">All Products</Link>
        </li>
        <li>
          <Link to="Category">All Categories</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
