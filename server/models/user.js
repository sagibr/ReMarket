const mongoose = require(`mongoose`)

const UserSchema = mongoose.Schema([
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    refreshToken: { type: String },
  },
])

const User = mongoose.model(`user`, UserSchema)
module.exports = User
