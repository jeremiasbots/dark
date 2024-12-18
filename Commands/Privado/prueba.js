const Discord = require('discord.js');

module.exports = {
  name: "ejemplo", 
  alias: [], 
  developer: true,

execute (client, message, args){

  const embed = new Discord.MessageEmbed()
  .setTitle("Titulo del embed")
  .setAuthor({ name: "Nombre del author", iconURL: "https://cdn.discordapp.com/avatars/711401170429804624/4ad981acdf8bb7cbe0a788fd291286ee.png?size=2048"})
  .setURL("https://cdn.discordapp.com/avatars/711401170429804624/4ad981acdf8bb7cbe0a788fd291286ee.png?size=2048")
  .setDescription("Descripcion")
  .setImage("https://cdn.discordapp.com/attachments/940406058243993700/940414359102963732/unknown.png")
  .setThumbnail("https://cdn.discordapp.com/attachments/940406058243993700/940414416866918461/unknown.png")
  .setFooter({ text: "Footer" })
  .setTimestamp()
  .setColor("RANDOM")

  message.channel.send({ embeds: [embed], content: "Contenido fuera del embed"})


 }

} 