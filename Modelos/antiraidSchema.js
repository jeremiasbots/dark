const { Schema, model } = require('mongoose') // si p, dislexia // xd

const antiraidSchema = new Schema({
    Guild: {
        type: String,
        default: ""
    },
    antiCrearCanales: {
        type: Boolean,
        default: false
    },
    limiteAntiCrearCanales: {
        type: Number,
        default: 5
    }
})
module.exports = model('AntiRaid', antiraidSchema)