import { useDispatch } from "react-redux"
import axios from "../api/axios"
import { login } from "../slice/userSlice"
const useRefreshToken = () => {
  const REFRESH_URL = "/refresh"

  const dispatch = useDispatch()

  const refresh = async () => {
    //save new access token in response
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    })
    //save to user the new access token

    dispatch(
      login({
        name: response.data.name.join(""),
        email: response.data.email.join(""),
        accessToken: response.data.accessToken,
        roles: response.data.roles,
      })
    )

    return response.data.accessToken
  }

  return refresh
}
export default useRefreshToken
