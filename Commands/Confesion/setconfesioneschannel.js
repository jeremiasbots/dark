const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb') 
const canalconfesiones = new db.crearDB('confesioneschannel')


module.exports = {
  name: "setconfesioneschannel", 
  alias: [], 

execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_CHANNELS")
  if(!perms) return message.channel.send("No tienes los permisos para manejar canales")

  const canal = message.mentions.channels.first() 
  if(!canal) return message.channel.send("Menciona un canal!")
  const canalservidor = message.guild.channels.resolve(canal.id)
  if(!canalservidor) return message.channel.send("El canal debe estar en el servidor!")


  canalconfesiones.establecer(message.guild.id, canal.id)

  message.channel.send(`El canal de confesiones anonimas es ahora **${canal.name}**`)

  

  


 }

} 