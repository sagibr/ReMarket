import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "../api/axios"

const MyProducts = () => {
  const [theItems, setTheItems] = useState()
  const auth = useSelector((state) => state.user.user)
  const config = {
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  }
  console.log(auth.email)
  const GetData = (set) => {
    axios
      .post(`/item/items/${auth.email}`, {}, config)
      .then((res) => res.data && set(res.data))
  }
  useEffect(() => {
    GetData(setTheItems)
    // eslint-disable-next-line
  }, [])
  console.log(theItems)
  return (
    <div className="flex flex-wrap overflow-hidden justify-evenly">
      {theItems?.map((item, index) => {
        return (
          <div
            key={index}
            className="w-56 mt-10 flex flex-col justify-between "
          >
            <h1 className="text-3xl text-center">{item.name}</h1>
            <img src={item.images} alt="" className="mt-8" />
            <Link
              to="/product"
              state={{ id: item._id }}
              className="text-center"
            >
              <button className="bg-black hover:text-red-700  mt-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                More info
              </button>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
export default MyProducts
