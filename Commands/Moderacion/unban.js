const Discord = require('discord.js');

module.exports = {
  name: "unban", 
  alias: ["desbanear"], 

 async execute (client, message, args){

   var perms = message.member.permissions.has("BAN_MEMBERS")
   if(!perms) return message.channel.send("No puedes desbanear miembros vengan admins")


  let userID = args[0];
  if(!userID) return message.channel.send("A quien vas a desbanear a nadie :0, escribe una ID porfa")
  const member = await client.users.fetch(userID)

  message.guild.fetchBans().then(bans => {
    if(bans.size === 0) return message.channel.send("El servidor no tiene ningun baneo")

    let bUser = bans.find(b => b.user.id == userID)
    if(!bUser) return message.channel.send("Este miembro no esta baneado.")

    message.guild.members.unban(bUser.user)
  })

   message.channel.send(`El usuario ${member.username} ha sido desbaneado correctamente.`)

 }

}