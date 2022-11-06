import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "../api/axios"
import Modal from "./Modal"

function Products() {
  const [products, setProducts] = useState([])
  const PRODUCT_URL = "/item/items"
  const auth = useSelector((state) => state.user.user)

  const config = {
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  }

  const getData = () => {
    axios
      .get(PRODUCT_URL, config)
      .then((res) => res.data && setProducts(res.data))
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="w-full text-center ">
      <h1 className="text-5xl text-black mt-10  font-bold  italic">
        Browse - Products
      </h1>
      <Modal getData={getData} />
      <div className="flex flex-wrap overflow-hidden justify-evenly">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="w-56 mt-10 flex flex-col justify-between"
            >
              <h1 className="text-3xl">{product.name}</h1>
              <img src={product.images} alt="" className="mt-8" />
              <Link to="/product" state={{ id: product._id }}>
                <button className="bg-blue-600 hover:bg-blue-500  mt-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  More info
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
