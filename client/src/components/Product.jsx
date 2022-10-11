import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import axios from "../api/axios"
import PatchModal from "./PatchModal"

function Product() {
  const auth = useSelector((state) => state.user.user)
  const config = {
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  }

  const [theItem, setTheItem] = useState({})
  const location = useLocation()
  const { id } = location.state
  const GET_ITEM_URL = `/item/items/${id}`
  const getData = (set) => {
    axios.get(GET_ITEM_URL, config).then((res) => res.data && set(res.data))
  }

  useEffect(() => {
    getData(setTheItem)
  }, [])
  console.log(theItem[0]?._id)
  const date = new Date(theItem[0]?.lastDate)
  const date1 = new Date(theItem[0]?.startDate)
  date.setHours(0, 0, 0, 0)
  date1.setHours(0, 0, 0, 0)
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0")
  }
  return (
    <div className="w-screen flex justify-around items-center mt-10">
      <div className="max-w-md rounded overflow-hidden shadow-lg flex flex-col items-center">
        <img
          className="w-60"
          src={theItem[0]?.images}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4 text-center">
          <div className="font-bold text-xl mb-2">{theItem[0]?.name}</div>
          <p className="text-gray-700 text-base">{theItem[0]?.description}</p>
          <p className="text-green-900 text-base mt-3">
            Since :{" "}
            {[
              date1.getFullYear(),
              padTo2Digits(date1.getMonth() + 1),
              padTo2Digits(date1.getDate()),
            ].join("-")}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Bids : {theItem[0]?.bids}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Price :{" "}
            {theItem[0]?.lastPrice
              ? theItem[0]?.lastPrice
              : theItem[0]?.startPrice}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-red-900 mr-2 mb-2">
            Last Date :
            {[
              date.getFullYear(),
              padTo2Digits(date.getMonth() + 1),
              padTo2Digits(date.getDate()),
            ].join("-")}
          </span>
        </div>
      </div>
      <PatchModal
        id={theItem[0]?._id}
        price={
          theItem[0]?.lastPrice ? theItem[0]?.lastPrice : theItem[0]?.startPrice
        }
        getData={() => getData(setTheItem)}
      />
    </div>
  )
}

export default Product
