const { Schema, model } = require('mongoose')

const economiaSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    moneyBank: {
        type: Number,
        required: true
    },
    items: Array
})

module.exports = model("economy", economiaSchema)