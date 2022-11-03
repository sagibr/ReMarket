import { Router } from "express"
const router = Router()

import { create, find, findByIdAndUpdate } from "../../models/item"

router.get("/items", (req, res, next) => {
  find()
    .then((data) => res.json(data))
    .catch(next)
})

router.get("/items/:id", (req, res, next) => {
  find({ _id: req.params["id"] })
    .then((data) => res.json(data))
    .catch(next)
})

router.post("/items", (req, res, next) => {
  req.body
    ? create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ eror: "this input is empty" })
})

router.patch("/items/:id", (req, res, next) => {
  findByIdAndUpdate(req.params.id, req.body, { new: true })
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

export default router
