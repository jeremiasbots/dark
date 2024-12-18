const { Schema, model } = require("mongoose")

const jtc = new Schema({
    Guild: String,
    Channel: String
})

module.exports = model("jtcSchema", jtc)