import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handlePasswordChange = (value) => {
    setPassword(value);
    console.log(password);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    console.log(email);
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:3001/login`, { email: email, password: password })
      .then((res) => res.data && console.log(res.data));
  };
  return (
    <div className="w-full  flex justify-center items-center mt-32">
      <div className="w-full max-w-xs text-center">
        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-black  text-3xl mb-5 ">Log-in</h1>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                handleEmailChange(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="input">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
