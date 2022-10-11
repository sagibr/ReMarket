import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import axios from "../api/axios";

export default function PatchModal(props) {
  const UPDATE_ITEM_URL = `/item/items/${props.id}`;
  const user = useSelector((state) => state.user.user);
  const schema = yup.object().shape({
    lastPrice: yup.number().required().min(props.price),
  });
  const auth = useSelector((state) => state.user.user);
  const config = {
    headers: {
      Authorization: `Bearer ${auth?.accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const [showModal, setShowModal] = React.useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const obj = {
      ...data,
      bids: props.bids + 1,
      winner: {
        name: user.name,
        email: user.email,
      },
    };
    axios
      .patch(UPDATE_ITEM_URL, JSON.stringify(obj), config)
      .then(props.getData())
      .then(setShowModal(false));
  };
  return (
    <>
      <button
        className="bg-blue-500 text-white mt-5 active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add a new BID
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
                    How much would you like to Pay ?
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold ">
                        Your BID :
                      </label>
                      <input
                        {...register("lastPrice")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {errors?.lastPrice && (
                        <p className="text-red-600">
                          {errors?.lastPrice?.message || "Error!"}
                        </p>
                      )}
                    </div>
                    <input
                      value="SUBMIT"
                      type="submit"
                      disabled={!isValid}
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
  );
}
