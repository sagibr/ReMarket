const bcrypt = require("bcrypt")
const User = require(`../models/user`)
require("dotenv").config()

const handleNewUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body
  if (!email || !password || !name || !phoneNumber)
    return res.status(400).json({ message: "missing inputs" })
  const duplicate = await User.findOne({ email: email }).exec()
  if (duplicate) return res.sendStatus(409) //Conflict

  try {
    //encrypt the password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.PasswordSalt)
    )
    //create and store the new user
    const result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
    })
    console.log(result)
    res.status(201).json({ sucess: `New user ${email} created` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleNewUser }
