const { Schema, model } = require("mongoose")

const forever = new Schema({
    Guild: String,
    Member: String,
    Roles: Array
})

module.exports = model("roleforeverSchema", forever)