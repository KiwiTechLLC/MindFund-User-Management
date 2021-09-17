const express = require('express');
const path = require("path");
const app = express();
var morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");


const routes = require("./routes/v1/index.js");
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
const environment = process.env.NODE_ENV;

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const connectionUrl = `mongodb://${host}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected!");
});

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("User services....");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
