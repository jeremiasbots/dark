const Discord = require('discord.js');
const db = require('megadb')

module.exports = {
  name: "ship", 
  alias: [], 

execute (client, message, args){

 const usuario = message.guild.members.cache.get(args[0]) 
 const usuario2 = message.guild.members.cache.get(args[1])
 let random = Math.floor(Math.random() * 20) + 35

 if(!usuario || !usuario2) return message.reply("Pon los 2 usuarios")


  const embed = new Discord.MessageEmbed()
  .setTitle("amor")
  .setDescription(`Creo que ${usuario} ama a ${usuario2} ${random}%!`)
  .setImage("https://acegif.com/wp-content/uploads/anime-love-29.gif")
  .setColor("RANDOM")

  message.reply({ embeds: [embed] })
  
 }

} 