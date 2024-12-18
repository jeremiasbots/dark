const { Schema, model } = require("mongoose");

const channelSchema = new Schema({
  Guild: {
    type: String,
    required: true
  },
  Channels: {
    type: Array
  }
});

module.exports = model("canalTickets", channelSchema);