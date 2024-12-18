const { Schema, model } = require("mongoose");

const WelcomeSchema = new Schema({
  guildId: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  }
});

module.exports = model('WelcomeChannel', WelcomeSchema);