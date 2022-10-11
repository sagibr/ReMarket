const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = connectDB
