const express = require("express")
const Items = require("../models/item")
const router = express.Router()
const ROLES_LIST = require("../config/roles_list")
const verifyRoles = require("../middleware/verifyRoles")

router.get("/items", (req, res, next) => {
  Items.find()
    .then((data) => res.json(data))
    .catch(next)
})

router.get("/items/:id", (req, res, next) => {
  Items.find({ _id: req.params["id"] })
    .then((data) => res.json(data))
    .catch(next)
})

router.post(
  "/items",
  verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
  (req, res, next) => {
    req.body
      ? Items.create(req.body)
          .then((data) => res.json(data))
          .catch(next)
      : res.json({ eror: "this input is empty" })
  }
)

router.delete("/items/:id", verifyRoles(ROLES_LIST.Admin), (req, res, next) => {
  Items.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router
