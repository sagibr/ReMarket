const express = require("express")
const router = express.Router()

const Items = require("../../models/item")

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

router.post("/items", (req, res, next) => {
  req.body
    ? Items.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ eror: "this input is empty" })
})

router.patch("/items/:id", (req, res, next) => {
  Items.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((items) => {
      if (!items) {
        return res.status(404).send()
      }
      res.send(items)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

module.exports = router
