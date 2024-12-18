const Discord = require('discord.js');

module.exports = {
  name: "apodo", 
  alias: [], 

execute (client, message, args){

  if(!message.member.permissions.has('MANAGE_NICKNAMES')) return message.channel.send("No tienes los permisos para cambiar apodos")

  const persona = message.mentions.members.first()
  if(!persona) return message.channel.send("Cual es la persona ninguna :0")

  const apodo = args.slice(1).join(" ")
  if(!apodo) return message.channel.send("Cual es el apodo ninguno :0")


  persona.setNickname(apodo)

  message.channel.send(`${persona.user.tag} ahora se llama **${apodo}**`)


 }

} 