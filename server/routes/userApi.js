const express = require(`express`)
const router = express.Router()
const User = require(`../models/user`)

router.get(`/users`, (req, res, next) => {
  User.find({ email: req.body.email, password: req.body.password })
    .then((data) => res.json(data))
    .catch(next)
})
router.post(`/users`, (req, res, next) => {
  req.body
    ? User.create(req.body)
        .then((data) => res.json(data))
        .catch(next)
    : res.json({ error: `Please enter an input` })
})

router.delete(`/users/:id`, (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next)
})

module.exports = router
