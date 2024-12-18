const { Schema, model } = require("mongoose");

const commandSchema = new Schema({
  guildId: {
    type: String,
    required: true
  },
  commands: {
    type: Array
  }
});

module.exports = model('cmdSchema', commandSchema);