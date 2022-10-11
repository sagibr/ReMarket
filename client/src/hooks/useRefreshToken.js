import { useDispatch, useSelector } from "react-redux"
import axios from "../api/axios"
import { login } from "../slice/userSlice"
const useRefreshToken = () => {
  const REFRESH_URL = "/refresh"

  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const refresh = async () => {
    console.log(user.accessToken)
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
    console.log(user.accessToken)

    return response.data.accessToken
  }

  return refresh
}
export default useRefreshToken
