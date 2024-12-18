const { Schema, model } = require('mongoose')

const staffsSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    points: {
        type: Number
    }
})

module.exports = model("staffs", staffsSchema)