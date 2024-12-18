const { Schema, model } = require("mongoose")

const tickets = new Schema({
    Guild: String,
    Roles: Array
})

module.exports = model("roleTickets", tickets)