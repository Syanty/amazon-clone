const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/user");

dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongodb connected");
    }
  }
);

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const productRoutes = require("./routes/product");

app.get("/", (req, res) => res.json("Hello Amazon Clone"));

app.use("/api", productRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Amazon clone listening on port port!`);
  }
});
