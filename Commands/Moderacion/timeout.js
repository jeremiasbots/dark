const Discord = require('discord.js');
const ms = require('ms')
const { Client, Message } = require("discord.js")


module.exports = {
  name: "timeout", 
  alias: [], 
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {string[]} args 
   */

async execute (client, message, args){

  if(!message.member.permissions.has("MODERATE_MEMBERS")) return message.channel.send("No tienes permisos para aislar miembros.")

  const member = message.mentions.members.first()
  if(!member) return message.channel.send("Menciona a un miembro.")

  if (!message.member.roles.highest.position > member.roles.highest.position){
    message.reply("Tu rol esta por debajo de la persona que quieres aislar.")
    return;
  }

  if (!message.guild.me.roles.highest.position > member.roles.highest.position){
    message.reply("Mi rol esta por debajo de la persona que quieres aislar temporalmente")
    return;
  }

  let time = args[1]
  if(!time) return message.channel.send("Cual es el tiempo?")
  let timer = ms(time)

  if(member.isCommunicationDisabled()){
    message.reply("Ese miembro ya esta aislado!")
    return;
  }


  const razon = `Usuario aislado por ${message.author.tag} durante ${time}`

  const embed = new Discord.MessageEmbed()
  .setTitle("**Aislamiento**")
  .setDescription(`El usuario ${member} fue aislado temporalmente por ${message.author.username} durante ${time}\n\n**Razón:** ${razon}`)
  .setThumbnail(member.displayAvatarURL({ format: 'png' }))
  .setColor("ORANGE")
  .setFooter({ text: "AISLAMIENTO" })
  .setTimestamp()

  await member.timeout(timer, razon)

  message.reply({ embeds: [embed] })

 }

}