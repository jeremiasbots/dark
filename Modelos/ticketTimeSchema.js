const { Schema, model } = require('mongoose')

const timeSchema = new Schema({
    Guild: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = model("ticketTime", timeSchema)