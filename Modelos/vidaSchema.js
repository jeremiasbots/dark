const { Schema, model } = require("mongoose")

const vida = new Schema({
    Guild: { type: String, required: true },
    User: String,
    Vida: { type: Number, default: 20 }
})

module.exports = model('vidaSchema', vida)