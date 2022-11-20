const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Money = require("./modules/money");
const Cookie = require("./modules/cookie");
const People = require("./modules/people");
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

app.get('/', function(req, res) {
  res.send('hello world')
})


app.get("/home", (req, res) => {
  // send 只能送str 不能送檔案
  res.render("Home_page.ejs");
});

// 人員清單(非同步)
app.get("/people/read", async (req, res) => {
  try {
    let person_data = await People.find();
    res.render("people_read.ejs", { person_data });
  } catch {
    res.send("Error with finding data.");
  }
});

// 人員新增
app.get("/people/creat", (req, res) => {
  res.render("people_creat_id.ejs");
});
app.post("/people/creat", (req, res) => {
  console.log(req.body);
  let { id, name, nick_name, people_table, people_table_position } = req.body;
  let newPeople = new People({
    id,
    name,
    nick_name,
    people_table,
    people_table_position,
  });
  newPeople
    .save()
    .then(() => {
      console.log("people data accept");
      res.render("accept_people.ejs");
    })
    .catch((e) => {
      console.log("people data failed");
      // 顯示錯誤訊息於終端
      console.log(e);
      res.render("failed_people.ejs");
    });
});

// 個人頁面
app.get("/people/:nick_name", async (req, res) => {
  let { nick_name } = req.params;
  try {
    let people_data = await People.findOne({ nick_name });
    if (people_data !== null) {
      res.render("people_personal_page.ejs", { people_data });
    } else {
      res.send("Cannot find this person. Please enter a valid name.");
    }
  } catch (e) {
    res.send("Error!!");
    console.log(e);
  }
});

// 禮金清單
app.get("/people/money/read", async (req, res) => {
  try {
    let money_data = await Money.find();
    let people_data = await People.find();
    res.render("money_read.ejs", { money_data, people_data });
  } catch {
    res.send("Error with finding data.");
  }
});

// 填入禮金
app.get("/people/money/creat", (req, res) => {
  res.render("money_creat.ejs");
});

app.post("/people/money/creat", (req, res) => {
  // console 檢視送出的資料(使用者傳回的資料有什麼?)
  console.log(req.body);
  let { money } = req.body;
  let newMoney = new Money({
    money,
  });
  newMoney
    .save()
    .then(() => {
      console.log("money data accept");
      res.render("accept_money.ejs");
    })
    .catch((e) => {
      console.log("money data failed");
      // 顯示錯誤訊息於終端
      console.log(e);
      res.render("failed_money.ejs");
    });
});

// 喜餅詢問(insert)
app.get("/people/cookie/creat", (req, res) => {
  res.render("cookie.ejs");
});

app.post("/people/cookie/creat", (req, res) => {
  console.log(req.body);
  let { cookie } = req.body;
  let newCookie = new Cookie({
    cookie,
  });
  newCookie
    .save()
    .then(() => {
      console.log("cookie data accept");
      res.render("accept_cookie.ejs");
    })
    .catch((e) => {
      console.log("cookie data failed");
      // 顯示錯誤訊息於終端
      console.log(e);
      res.render("failed.ejs");
    });
});

// cookie list
app.get("/people/cookie/read", async (req, res) => {
  try {
    let cookie_data = await Cookie.find();
    let people_data = await People.find();
    res.render("cookie_read.ejs", { cookie_data, people_data });
  } catch {
    res.send("Error with finding data.");
  }
});

// map.read
app.get("/people/map/read", async (req, res) => {
  try {
    let map_data = await Map.find();
    let people_data = await People.find();
    res.render("cookie_read.ejs", { map_data, people_data });
  } catch {
    res.send("Error with finding data.");
  }
});

// map.creat
app.get("/people/map/creat", (req, res) => {
  res.render("map_creat.ejs");
});

app.post("/people/map/creat", (req, res) => {
  let { map } = req.body;
  let newMap = new map({});
});

// map.update
app.get("/people/map/update", (req, res) => {
  res.render("map_update.ejs");
});

module.exports = app;