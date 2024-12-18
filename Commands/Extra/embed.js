const Discord = require('discord.js');

module.exports = {
  name: "embed", 
  alias: [], 

execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("No puedes manejar mensajes!")

  const texto = args.join(' ')
  if(!texto) return message.channel.send("Escribe lo que contiene el embed!")

  let opciones = texto.split(' ! ')

  const embed = new Discord.MessageEmbed()
  .setTitle(opciones[0])
  .setDescription(opciones[1])
  .setFooter(opciones[2])
  .setColor(opciones[3])

  message.channel.send({ embeds: [embed] })

 }

} 