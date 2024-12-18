const { Schema, model } = require("mongoose");

const twitchSchema = new Schema({
  titulo: {
    type: String,
    required: true
  }
});

module.exports = model('Twitch', twitchSchema);