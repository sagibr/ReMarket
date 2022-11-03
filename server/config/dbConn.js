import { connect } from "mongoose"

const connectDB = async () => {
  try {
    await connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
  } catch (err) {
    console.error(err)
  }
}

export default connectDB
