const Discord = require('discord.js');


module.exports = {
  name: "userinfo", 
  alias: [], 

async execute (client, message, args){

  let estados = {
    "online": "Conectado",
    "offline": "Desconectado",
    "idle": "Ocupado",
    "dnd": "No molestar"
  }

  

  const member = message.mentions.members.first() || message.member

  const Member = message.guild.members.cache.get(member.id)


  const Target = message.mentions.members.first() || message.member



  const time = client.users.cache.get(Target.id)

  const timestampc = time.createdTimestamp




  const embed = new Discord.MessageEmbed()
  .setTitle(`**Info del usuario**`, `${member}`)
  .setColor("RANDOM")
  .addField(`**Nombre**`,`${member}`)
  .addField(`**Nombre completo**`, `${member.user.tag}`)
  .addField(`**ID**`,`${member.id}`)
  .addField(`**Apodo**`, member.nickname ? `${member.nickname}`: '❌')
  .addField("**Union al server**", `<t:${parseInt(Target.joinedTimestamp / 1000)}:F>`)
  .addField("**Cuando creo la cuenta**", `<t:${parseInt(timestampc / 1000)}:F>`)
  .addField("**ROLES**", member.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
  .addField("**Booster:**", member.premiumSince ? '✅': '❌')
  .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: 'true' }))







  message.reply({ embeds: [embed] })

 }

} 