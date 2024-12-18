const mongoose = require('mongoose')

const deleteSchema = new mongoose.Schema({
    GuildId: String,
    ChannelId: String,
    Tiempo: Number
})

const model = mongoose.model("DeleteSchema", deleteSchema)

module.exports = model;