const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "revertir", 
  alias: [], 

execute (client, message, args){

  
  const userblack = message.author;

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  if(!args[0]) return message.channel.send("Escribe algo!")

  const revertir = args.join(' ').split('').reverse().join('')

  const embed = new Discord.MessageEmbed()
  .setTitle("Revertir")
  .setDescription(`La palabra al reves es ${revertir}`)
  .setFooter(`Solicitado por ${message.author.tag}`)
  .setColor("RANDOM")

  message.channel.send({ embeds: [embed] })



 }

} 