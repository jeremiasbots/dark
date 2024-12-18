const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb') 
const muterol = new db.crearDB("muterol")


module.exports = {
  name: "muterol", 
  alias: [], 

execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_ROLES")
  if(!perms) return message.channel.send("No tienes los permisos para establecer el rol de mute")

  let rol = message.mentions.roles.first();
  if(!rol) return message.channel.send("Debes mencionar un rol!")

  muterol.establecer(message.guild.id, rol.id)

  message.channel.send(`Se ha establecido como rol de mute **${rol.name}**`)




 }

} 