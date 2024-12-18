const Discord = require('discord.js');
const db = require('megadb')
const logs_db = new db.crearDB("logs")


module.exports = {
  name: "setlogs", 
  alias: [], 

execute (client, message, args){
  
  let permiso = message.member.permissions.has("ADMINISTRATOR")
  if(!permiso) return message.reply("No tienes los permisos para establecer el canal de logs!")

  const canalm = message.mentions.channels.first()

  if(!canalm) return message.reply("Menciona un canal para el registro de auditoria!")

  logs_db.establecer("logs_" + message.guild.id, canalm.id)

  message.channel.send("El canal <#" + canalm.id + "> ahora es el canal de logs!")
  


 }

} 