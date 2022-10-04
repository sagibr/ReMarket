const bcrypt = require("bcrypt")
const User = require(`../models/user`)
const jwt = require("jsonwebtoken")
require("dotenv").config()

const handleLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: "missing inputs" })

  const foundUser = await User.findOne({ email: email }).exec()

  if (!foundUser) return res.sendStatus(401) //Unauthorized

  //evaluate password
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    )
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    )
    //saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      //   secure: true, (add in production)
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } else {
    res.sendStatus(401) //Unauthorized
  }
}

module.exports = { handleLogin }
