var express = require("express");
var http = require("http");
const os = require("os");

const ip = require("dns").lookup(
    require("os").hostname(),
    function (err, add, fam) {
      console.log("addr: " + add);
    }
  );



const app = express.Router();



module.exports = app;