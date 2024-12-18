const Discord = require('discord.js');

module.exports = {
  name: "clear", 
  alias: [], 
  /**
   * 
   * @param {Discord.Client} client 
   * @param {Discord.Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("No tienes los permisos para eliminar mensajes")



  const valor = parseInt(args[0]);
  if(!valor) return message.channel.send("Debes escribir una cantidad de mensajes para borrar")
  if(isNaN(valor)) return message.channel.send("Debes escribir una cantidad de mensajes para eliminar")
  if(valor >= 100) return message.channel.send("No puedes borrar mas de 99 mensajes a la vez")

  message.channel.bulkDelete(valor + 1).catch((error) => message.reply("No puedo borrar mensajes con más de 14 días de antiguedad"))
  
  message.channel.send(`Se han borrado ${valor} mensajes correctamente`).then(msg => msg.delete({timeout: 2000}))


 }

} 