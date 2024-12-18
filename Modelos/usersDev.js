const { Schema, model } = require('mongoose') // si p, dislexia // xd

const devSchema = new Schema({
    userId: {
        type: String,
        required: true
    }

})
module.exports = model('usersDev', devSchema) // ya p, guarda pa probar //ok ya ire reinciando en el host xd