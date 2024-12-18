const { Schema, model } = require("mongoose")

const modelo = new Schema({
    guild: { type: String, required: true },
    canal: String
})

module.exports = model('sugerenciasModel', modelo)