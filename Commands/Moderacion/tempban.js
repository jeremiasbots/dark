const Discord = require('discord.js');
const ms = require('ms')


module.exports = {
  name: "tempban", 
  alias: [], 

async execute (client, message, args){

  if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("No tienes permisos para banear miembros vengan admins")

  const member = message.mentions.members.first()
  if(!member) return message.channel.send("A quien banearas temporalmente a nadie :0")

  if (!message.member.roles.highest.position > member.roles.highest.position){
    message.reply("Tu rol esta por debajo de la persona que quieres banear temporalmente.")
    return;
  }

  if (message.guild.me.roles.highest.position > member.roles.highest.position){
    message.reply("Mi rol esta por debajo de la persona que quieres banear temporalmente.")
    return;
  }

  let time = args[1]
  if(!time) return message.channel.send("Cual es el tiempo, ninguno :0")
  let timer = ms(time)

  message.channel.send(`El usuario ${member} fue baneado temporalmente por ${message.author.username} durante ${time}`)

  await member.ban({reason: `Usuario temporalmente baneado por ${message.author.tag} durante ${time}`})
  await setTimeout(async function () {
    await message.guild.members.unban(member.id)

    message.channel.send(`El usuario ${member} fue desbaneado`)
  }, timer)

 }

}