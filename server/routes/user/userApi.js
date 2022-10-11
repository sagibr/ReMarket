const express = require(`express`)
const router = express.Router()
const User = require(`../../models/user`)
const { handleNewUser } = require("../../controllers/registerController")
const { handleLogin } = require("../../controllers/authController")

router.post(`/login`, (req, res, next) => {
  handleLogin(req, res)
})
router.post(`/register`, (req, res, next) => {
  handleNewUser(req, res)
})

module.exports = router
