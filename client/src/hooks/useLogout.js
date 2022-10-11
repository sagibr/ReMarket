import { useDispatch, useSelector } from "react-redux"
import axios from "../api/axios"
import { logout as signout } from "../slice/userSlice"

const useLogout = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    dispatch(signout())
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return logout
}
export default useLogout
