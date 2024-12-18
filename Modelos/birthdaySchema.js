const { Schema, model } = require("mongoose");

const BirthdaySchema = new Schema({
   User: String,
   Birthday: String
});

module.exports = model('birthday', BirthdaySchema);