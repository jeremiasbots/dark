const { Schema, model } = require('mongoose') // si p, dislexia // xd

const linksSchema = new Schema({
    Guild: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean
    }
})
module.exports = model('antiLinksSchema', linksSchema)