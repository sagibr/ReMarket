import { Route, Routes } from "react-router"
import "./App.css"
import Home from "./components/Home"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Product from "./components/Product"
import Products from "./components/Products"
import Register from "./components/Register"
import RequireAuth from "./components/RequireAuth"

function App() {
  const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
  }
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="products" element={<Products />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
