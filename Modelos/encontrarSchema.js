const { Schema, model } = require("mongoose");

const findSchema = new Schema({
  Guild: {
    type: String,
    required: true
  },
  Channel: {
    type: String
  }
});

module.exports = model("canalPreguntas", findSchema);