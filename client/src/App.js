import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import Products from "./components/Products";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />} />
        <Route path="product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
