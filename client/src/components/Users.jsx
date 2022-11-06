import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useRefreshToken from "../hooks/useRefreshToken"

import { useLocation, useNavigate } from "react-router-dom"

const Users = () => {
  const refresh = useRefreshToken()

  const navigate = useNavigate()
  const location = useLocation()

  const USERS_URL = "/admin/users"
  const [users, setUsers] = useState()

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL, {
          signal: controller.signal,
        })
        isMounted && setUsers(response.data)
      } catch (err) {
        console.log(err)
        navigate("/user/login", { state: { from: location }, replace: true })
      }
    }
    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
    // eslint-disable-next-line
  }, [])
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>no users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
    </article>
  )
}

export default Users
