const { Schema, model } = require('mongoose') // si p, dislexia // xd

const blacklistSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    pruebas: {
        type: String,
        required: true
    },
    razon: {
        type: String,
        required: true
    }

})
module.exports = model('Blacklist', blacklistSchema) // ya p, guarda pa probar //ok ya ire reinciando en el host xd