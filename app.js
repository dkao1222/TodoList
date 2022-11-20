const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Money = require("./modules/money");
const Cookie = require("./modules/cookie");
const People = require("./modules/people");

const services = require('./route/service')
const PORT = 3000;
// 圖片
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
// photo middleware
let upload = multer({ storage: storage });

// middleware
app.use(express.static("public"));
// bodyParser 拿user 在get 頁面中送出的資料
app.use(bodyParser.urlencoded({ extended: true }));
// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "html");

// connect mongoDB
mongoose
  .connect(
    "mongodb+srv://SEAN:00000000@project9.4nzlv8x.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successfully connect to MongoDB");
  })
  .catch((e) => {
    console.log("connection failed");
    console.log(e);
  });

app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery')))
app.use('/popper', express.static(path.join(__dirname, '../node_modules/@popperjs/core/dist')))
app.use('/ionicons', express.static(path.join(__dirname, '../node_modules/ionicons')))


app.use('/', services);

app.get('/', function(req, res) {
  const rendeData = { title: `Welcome` };
  res.render("Home/home.ejs", rendeData);
})

module.exports = app;