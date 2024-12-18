const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const Schema = require("../../Modelos/birthdaySchema")


module.exports = {
  name: "check-birthday", 
  alias: [], 

execute (client, message, args){

    const user = message.mentions.users.first() || message.author;

    Schema.findOne({ User: user.id }, async(err, data) => {
        if(!data) return message.reply("Este usuario no tiene su cumpleaños en el bot.")
        message.reply(`El cumpleaños de ${user} es ${data.Birthday}`)
    })


 }

} 