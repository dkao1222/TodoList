const mongoose = require("mongoose");

const people_schema = new mongoose.Schema({
  id: {
    type: Number,
    min: 0,
    max: 999,
    min_length: 3,
    max_length: 3,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nick_name: {
    type: String,
    required: true,
  },
  people_table: {
    type: Number,
    required: true,
  },
  people_table_position: {
    type: Number,
    required: true,
  },
});

const people = mongoose.model("People", people_schema);
module.exports = people;
