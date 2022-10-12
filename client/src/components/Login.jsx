import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "../api/axios"
import { togglePersist } from "../slice/persistSlice"
import { login } from "../slice/userSlice"

function Login() {
  const dispatch = useDispatch()
  const persist = useSelector((state) => state.persist.persist)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const LOGIN_URL = "/user/login"

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const errRef = useRef()
  const [errMsg, setErrMsg] = useState("")

  useEffect(() => {
    setErrMsg("")
  }, [email, password])

  const handlePasswordChange = (value) => {
    setPassword(value)
  }
  const handleEmailChange = (value) => {
    setEmail(value)
  }
  const togglePersistFunction = () => {
    dispatch(togglePersist())
  }
  useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist])

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      const name = response?.data?.name.join("")

      dispatch(
        login({
          name: name,
          email: email,
          accessToken: accessToken,
          roles: roles,
        })
      )
      setEmail("")
      setPassword("")
      navigate(from, { replace: true })
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password")
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Login Failed")
      }
      errRef.current.focus()
    }
  }
  return (
    <div className="w-full  flex justify-center items-center mt-32">
      <div className="w-full max-w-xs text-center">
        <div className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-black  text-3xl mb-5 ">Log-in</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                handleEmailChange(e.target.value)
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
                handlePasswordChange(e.target.value)
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
          <div>
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersistFunction}
              checked={persist}
            ></input>
            <label htmlFor="persist">Trust This Device</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
