const mongoose = require("mongoose");

const cookie_schema = new mongoose.Schema({
  cookie: {
    type: Boolean,
    required: true,
  },
});

const cookie = mongoose.model("Cookie", cookie_schema);
module.exports = cookie;
