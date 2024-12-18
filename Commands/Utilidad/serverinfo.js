const Discord = require('discord.js');

module.exports = {
  name: "serverinfo", 
  alias: [], 

execute (client, message, args){
  
  const embed = new Discord.MessageEmbed()
  .setTitle("Informacion")
  .setThumbnail(message.guild.iconURL())
  .addField('ID:', `${message.guild.id}`)
  .addField('Dia de creacion', `<t:${parseInt(message.guild.createdTimestamp / 1000)}:F>`)
  .addField('Region:', `${message.guild.preferredLocale || "No hay región configurada"}`)
  .addField('Dueño:', `${client.users.cache.get(message.guild.ownerId).tag}`)
  .addField('Miembros:', `${message.guild.memberCount}`)
  .addField('Bots:', `${message.guild.members.cache.filter(m => m.user.bot).size}`)
  .addField('Emojis:', `${message.guild.emojis.cache.size}`)
  .addField('Boosts:', `${message.guild.premiumSubscriptionCount.toString()}`)
  .addField('Roles', `${message.guild.roles.cache.size}`)
  .setColor("RANDOM")



  message.reply({ embeds: [embed] })

 }

}