const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "juego", 
  alias: [], 

execute (client, message, args){


  const embed = new Discord.MessageEmbed()
  .setTitle("Jugaremos\nel\njuego\ndel\ncalamar")
  .setDescription(`Juego pedido por ${message.author.tag}`)
  .setColor("RANDOM")
  .setImage("https://ichef.bbci.co.uk/news/640/cpsprodpb/19EC/production/_121063660_squid13.png")

  message.channel.send({ embeds: [embed] })

 }

} 