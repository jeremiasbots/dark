const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "shoot", 
  alias: ["disparar"], 

execute (client, message, args){

    const userblack = message.author;

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const usuario = message.mentions.members.first() || message.member
  const autor = message.author.member || message.member
  if(!usuario) return message.channel.send("No te dispares")
  if(usuario.id === message.author.id) return message.channel.send("No te lo permitire")

  const embed = new Discord.MessageEmbed()
  .setTitle("Te dispare")
  .setDescription(`${autor} disparo a ${usuario}`)
  .setImage("https://c.tenor.com/BJYu8BK38ykAAAAC/disparando-asesinos.gif")
  .setColor("RANDOM")

  message.channel.send({ embeds: [embed] })


 }

} 