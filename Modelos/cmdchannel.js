const { Schema, model } = require("mongoose");

const channelSchema = new Schema({
  guildId: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  }
});

module.exports = model('cmdChannel', channelSchema);