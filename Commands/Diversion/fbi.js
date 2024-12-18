const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "fbi", 
  alias: ["policia"], 

execute (client, message, args){


  const autor = message.author.member || message.member

  const embed = new Discord.MessageEmbed()
  .setTitle("FBI")
  .setDescription(`${autor} se te acabo el negocio`)
  .setImage("https://c.tenor.com/GJjjoWDZyfEAAAAC/fbi.gif")
  .setColor("RANDOM")

  message.channel.send({ embeds: [embed] })

  

 }

} 