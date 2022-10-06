import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

const RequireAuth = ({ allowedRoles }) => {
  const auth = useSelector((state) => state.user.user)
  const location = useLocation()

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
export default RequireAuth
