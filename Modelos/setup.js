const { Schema, model } = require('mongoose')

const setupSchema = new Schema({
    guildID: String,
    reaccion_roles: Array,
    sistema_tickets: {type: Object, default: {canal: "", mensaje: ""}},
    sugerencias: {type: String, default: ""},
})

module.exports = model("setup", setupSchema)