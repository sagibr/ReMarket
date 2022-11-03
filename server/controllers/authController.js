import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import User from `../models/user`
require("dotenv").config()

const handleLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: "missing inputs" })

  const foundUser = await User.findOne({ email: email }).exec()

  if (!foundUser) return res.sendStatus(401) //Unauthorized

  //evaluate password
  const match = await compare(password, foundUser.password)
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean)
    const name = Object.values(foundUser.name)
    //create JWTs
    const accessToken = sign(
      { UserInfo: { email: foundUser.email, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    )
    const refreshToken = sign(
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
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ name, roles, accessToken })
  } else {
    res.sendStatus(401) //Unauthorized
  }
}

export default { handleLogin }
