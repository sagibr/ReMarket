const express = require("express")
const Items = require("../models/item")
const router = express.Router()

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

router.delete("/items/:id", (req, res, next) => {
  Items.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router
