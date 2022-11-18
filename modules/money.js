const mongoose = require("mongoose");

const mooney_schema = new mongoose.Schema({
  money: {
    type: Number,
    min: 0,
    required: true,
  },
});

const money = mongoose.model("Money", mooney_schema);
module.exports = money;
