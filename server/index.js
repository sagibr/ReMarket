const express = require("express");
const app = express();
const port = 3001;
const userRoute = require("./routes/userApi");

const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());

app.use("/api", userRoute);

app.use((req, err, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`server is up and runing on port ${port}`);
});
