const { Schema, model } = require("mongoose");

const mongodb = new Schema({
  Guild: String,
  Command: String,
  Response: String
});

module.exports = model('slashCustom', mongodb);