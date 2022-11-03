import User from "../models/user"

const handleLogout = async (req, res) => {
  //On client, also delete the accessToken

  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  const refreshToken = cookies.jwt

  //Is refresh token in DB?
  const foundUser = await User.findOne({ refreshToken }).exec()
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    return res.sendStatus(204)
  }

  //Delete refreshToken in db
  foundUser.refreshToken = ""
  const result = await foundUser.save()
  console.log(result)

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  })
  return res.sendStatus(204)
}
export default { handleLogout }
