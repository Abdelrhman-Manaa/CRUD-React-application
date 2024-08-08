import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Categories from "./components/categoties";
import About from "./components/About";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-10 sections_ma">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="About" element={<About />} />
            <Route exact path="Product" element={<Products />} />
            <Route exact path={`/product/:productId`} element={<Product />} />
            <Route exact path="/Product/add" element={<AddProduct />} />
            <Route
              exact
              path={`/product/edit/:productId`}
              element={<EditProduct />}
            />
            <Route exact path="Category" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
