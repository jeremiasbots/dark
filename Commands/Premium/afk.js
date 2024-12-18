const Discord = require('discord.js');
const db = require('megadb')
const qdb = new db.crearDB("afk")

module.exports = {
  name: "afk", 
  alias: [], 
  developer: true,

async execute (client, message, args){


  const usuario = message.author


  if(!args.join(' ')) {
    razon = 'No especificada'
  } else {
    razon = args.join(' ')
  }

  const tiempo = parseInt(Date.now() / 1000)



const embed = new Discord.MessageEmbed()
.setTitle("Afk")
.setDescription(`${message.author}, Ahora estas afk por el motivo ${razon}, avisare a quienes te mencionen`)
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
.setColor("RANDOM")


await qdb.set(`afk-${message.author.id}+${message.guild.id}`, razon)
await qdb.set(`afk-${message.author.id}+${message.guild.id}2`, tiempo)
message.channel.send({ embeds: [embed] })

} 

} 