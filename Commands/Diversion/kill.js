const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "kill", 
  alias: ["matar"], 
  description: "Mata a alguien",

execute (client, message, args){



  const usuario = message.mentions.members.first() || message.member
  const autor = message.author.member || message.member
  if(!usuario) return message.channel.send("No te suicides")
  if(usuario.id === message.author.id) return message.channel.send("Que alguien lo detenga!")
  

  const embed = new Discord.MessageEmbed()
  .setTitle("matar")
  .setDescription(`${autor} mato a ${usuario}`)
  .setImage("https://c.tenor.com/6VM7lzsBSuUAAAAC/id-invaded-gun.gif")
  .setColor("RANDOM")

  message.channel.send({ embeds: [embed] })

 }

} 