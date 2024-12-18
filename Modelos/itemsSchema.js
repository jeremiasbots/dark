const { Schema, model } = require("mongoose")

const items = new Schema({
    guildId: { type: String, required: true },
    items: { type: Array, default: [] }
})

module.exports = model("itemsSchema", items)