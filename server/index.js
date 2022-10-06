
const express = require("express")
const app = express()
const port = 3001
const itemRoutes = require("./routes/itemApi")
const userRoutes = require("./routes/userApi")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const bodyParser = require("body-parser")
const verifyJWT = require("./middleware/verifyJwt")

app.use(cors())

require("dotenv").config()
mongoose.Promise = global.Promise
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(bodyParser.json())


//middleware for cookies
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// app.use(verifyJWT)

app.use("/item", itemRoutes);

app.use((req, err, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`server is up and runing on port ${port}`);
});
