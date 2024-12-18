const Discord = require('discord.js');

module.exports = {
  name: "say", 
  alias: [], 

execute (client, message, args){

  if(!message.member.permissions.has("ADMINISTRATOR")){
    message.reply("Necesitas permisos de administrador para usar este comando.")
    return;
  }
  
  const texto = args.join(' ')
  if(!texto) return message.channel.send("Tienes que poner un mensaje para que yo envie")

  setTimeout(function(){
    message.delete()

    message.channel.send({ content: texto, allowedMentions: { parse: [] } })

  }, 1000)

 
  

 }

} 