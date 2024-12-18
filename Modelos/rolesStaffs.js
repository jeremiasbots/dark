const { Schema, model } = require('mongoose')

const staffsSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    roles: Array
})

module.exports = model("rolesdestaff", staffsSchema)