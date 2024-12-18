const { Schema, model } = require("mongoose");

const levelUp = new Schema({
  guildId: {
    type: String,
    required: true
  },
  messageUp: {
    type: String,
    required: true
  }
});

module.exports = model('levelUpMessage', levelUp);