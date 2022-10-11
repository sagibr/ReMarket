import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router"
import useRefreshToken from "../hooks/useRefreshToken"

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const user = useSelector((state) => state.user.user)
  const persist = useSelector((state) => state.persist.persist)

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh()
        console.log(user)
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    persist && user?.accessToken === ""
      ? verifyRefreshToken()
      : setIsLoading(false)

    return () => (isMounted = false)
  }, [])

  useEffect(() => {
    console.log(`isLoading ${isLoading}`)
    console.log(`aT ${JSON.stringify(user?.accessToken)}`)
  }, [isLoading])

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  )
}

export default PersistLogin
