const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

module.exports = {
  name: "question", 
  alias: ["pregunta"], 

execute (client, message, args){

  
  const userblack = message.author;

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const usuario = message.mentions.members.first() || message.member
  const autor = message.author.member || message.member

  if(!usuario) return message.channel.send(`Preguntemosle a ${autor}`)


  message.channel.send(`Preguntemosle a ${usuario}`)

 }

} 