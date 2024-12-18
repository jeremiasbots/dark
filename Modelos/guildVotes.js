const { Schema, model } = require("mongoose")

const guildVotes = new Schema({
    Guild: String,
    votosAceptar: Number,
    votosRechazar: Number
})

module.exports = model("guildVotes", guildVotes)