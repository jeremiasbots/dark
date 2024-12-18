const Discord = require('discord.js');

module.exports = {
  name: "ban", 
  alias: [], 

execute (client, message, args){

  const usuario = message.mentions.members.first()

  var perms = message.member.permissions.has("BAN_MEMBERS")
  if(!perms) return message.reply("No tienes permisos para banear miembros.")
  if(!usuario) return message.reply("Debes mencionar un usuario para banear.")
  if(usuario.id === message.author.id) return message.reply("No te puedes banear a ti mismo.")

  if (message.member.roles.highest.position <  usuario.roles.highest.position){
    message.reply("Tu rol esta por debajo de la persona que quieres banear.")
    return;
  }

  if (message.guild.me.roles.highest.position < usuario.roles.highest.position){
    message.reply("Mi rol esta por debajo de la persona que quieres banear.")
    return;
  }
  

  const razon = args.slice(1).join(' ')
  if(!razon) return message.channel.send("Debes decir una razon para banear a este miembro")

  usuario.ban({ reason: razon })

  message.channel.send(`Se ha baneado al usuario **${usuario}** correctamente.`)
  

 }

} 