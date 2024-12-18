const { Schema, model } = require("mongoose")

const votes = new Schema({
    mensaje: { type: String, required: true },
    votosPositivos: { type: Array, default: [] },
    votosNegativos: { type: Array, default: [] },
    votosNeutrales: { type: Array, default: [] },
    author: String,
    contenido: String
})

module.exports = model("votosSuggest", votes)