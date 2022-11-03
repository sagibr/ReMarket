import { Router } from `express`
import { handleLogin } from "../../controllers/authController"
import { handleNewUser } from "../../controllers/registerController"
const router = Router()

router.post(`/login`, (req, res, next) => {
  handleLogin(req, res)
})
router.post(`/register`, (req, res, next) => {
  handleNewUser(req, res)
})

export default router
