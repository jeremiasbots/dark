const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    guildID: String,
    channelID: String,
})

const model = mongoose.model("logs", logsSchema);

module.exports = model;