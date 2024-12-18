const Discord = require('discord.js');

module.exports = {
  name: "avatar", 
  alias: [], 
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

execute (client, message, args){

  const usuario = message.mentions.members.first() 

  const embed2 = new Discord.MessageEmbed()
  .setTitle("Avatar del servidor")
  .setImage(message.guild.iconURL({size: 1024, dynamic: true}))
  .setFooter({ text: `Solicitado por ${message.author.tag}` })
  .setColor("RANDOM")

  if(!usuario && message.guild.iconURL() === null){
    message.reply("Este servidor no tiene un avatar")
    return;
  }

  if(!usuario){
    message.reply({ embeds: [embed2] })
    return;
  }


  const embed = new Discord.MessageEmbed()
  .setTitle(`Avatar de ${usuario.user.username}`)
  .setImage(usuario.user.displayAvatarURL({ size: 1024, dynamic: true }))
  .setURL(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
  .setURL(usuario.user.displayAvatarURL({ size: 1024, dynamic: true }))
  .setFooter({ text: `Solicitado por: ${message.author.tag}` })
  .setColor("RANDOM")
  

  message.reply({ embeds: [embed] })

 }

} 