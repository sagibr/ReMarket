import express, { json, urlencoded } from "express"
import corsOptions from "./config/corsOptions.js"
import connectDB from "./config/dbConn.js"
import credentials from "./middleware/credentials.js"
import adminRoutes from "./routes/admin/admin.js"
import itemRoutes from "./routes/item/itemApi.js"
import userRoutes from "./routes/user/userApi.js"
const app = express()

import cookieParser from "cookie-parser"
import cors from "cors"
import { default as mongoose } from "mongoose"
import verifyJWT from "./middleware/verifyJWT.js"
const PORT = process.env.PORT || 3001

// Connect to MongoDB
connectDB()

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(urlencoded({ extended: false }))

// built-in middleware for json
app.use(json())

//middleware for cookies
app.use(cookieParser())

// routes
app.use("/refresh", require("./routes/user/refresh").default)
app.use("/logout", require("./routes/user/logout").default)
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
