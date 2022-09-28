import { Route, Routes } from "react-router"
import "./App.css"
import Home from "./components/Home"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Register from "./components/Register"

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
