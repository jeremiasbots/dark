const { Schema, model } = require("mongoose");

const findSchema = new Schema({
   guildId: {
    type: String,
    required: true
  },
  channelId: {
    type: String
  }
});

module.exports = model("emojiSugs", findSchema);