const express = require("express")
const app = express()
const itemRoutes = require("./routes/item/itemApi.js")
const userRoutes = require("./routes/user/userApi.js")
const adminRoutes = require("./routes/admin/admin.js")
const connectDB = require("./config/dbConn.js")
const credentials = require("./middleware/credentials.js")
const corsOptions = require("./config/corsOptions.js")

const cookieParser = require("cookie-parser")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const verifyJWT = require("./middleware/verifyJWT.js")
const PORT = process.env.PORT || 3001

// Connect to MongoDB
connectDB()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

//middleware for cookies
app.use(cookieParser())

// routes
app.use("/refresh", require("./routes/user/refresh"))
app.use("/logout", require("./routes/user/logout"))
app.use("/user", userRoutes)

app.use(verifyJWT)
app.use("/admin", adminRoutes)
app.use("/item", itemRoutes)

app.use((req, err, next) => {
  console.log(err)
  next()
})

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
