import { Router } from `express`
const router = Router()

import { findOneAndDelete as _findOneAndDelete } from "../../models/item"
import { find, findOneAndDelete } from `../../models/user`

import { Admin } from "../../config/roles_list"
import verifyRoles from "../../middleware/verifyRoles"

router.get("/users", verifyRoles(Admin), (req, res, next) => {
  find()
    .then((data) => res.json(data))
    .catch(next)
})

router.delete(`/users/:id`, (req, res, next) => {
  findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

router.delete("/items/:id", verifyRoles(Admin), (req, res, next) => {
  _findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

export default router
