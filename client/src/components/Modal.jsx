import { yupResolver } from "@hookform/resolvers/yup"
import React from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import * as yup from "yup"
import axios from "../api/axios"

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  startPrice: yup.number().required(),
  images: yup.string(),
  lastDate: yup.date().required(),
})

export default function Modal(props) {
  const auth = useSelector((state) => state.user.user)
  const config = {
    headers: {
      Authorization: `Bearer ${auth?.accessToken}`,
      "Content-Type": "application/json",
    },
  }
  const POST_ITEM_URL = "/item/items"
  const [showModal, setShowModal] = React.useState(false)
  const {
    register,
    // eslint-disable-next-line
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) })

  const onSubmit = (data) => {
    const newData = { ...data, publisher: auth.email }
    axios.post(POST_ITEM_URL, newData, config)
    setShowModal(false)
    window.location.reload()
  }
  return (
    <>
      <button
        className="bg-blue-500 text-white mt-5 active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add a new Product
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="text-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-center">
                    Describe your Product
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold ">
                        Name
                      </label>
                      <input
                        {...register("name")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors?.name && (
                        <p className="text-red-600">
                          {errors?.name?.message || "Error!"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold ">
                        Description
                      </label>
                      <input
                        {...register("description")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors?.description && (
                        <p className="text-red-600">
                          {errors?.description?.message || "Error!"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold ">
                        Image
                      </label>
                      <input
                        defaultValue={
                          "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                        }
                        {...register("images")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors?.images && (
                        <p className="text-red-600">
                          {errors?.images?.message || "Error!"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold ">
                        Starting Price
                      </label>
                      <input
                        {...register("startPrice")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors?.startPrice && (
                        <p className="text-red-600">
                          {errors?.startPrice?.message || "Error!"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold ">
                        Last - Date
                      </label>
                      <input
                        type="date"
                        {...register("lastDate")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors?.lastDate && (
                        <p className="text-red-600">
                          {errors?.lastDate?.message || "Error!"}
                        </p>
                      )}
                    </div>
                    <input
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
                    />
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
