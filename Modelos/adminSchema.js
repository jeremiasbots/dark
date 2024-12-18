const { Schema, model } = require('mongoose')

const staffsSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    rolesId: {
        type: Array,
        default: []
    }
})