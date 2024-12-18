const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "remove-money", 
  alias: [], 
  developer: true,

execute (client, message, args){

  
  const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user = message.author;

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms) return message.channel.send("No tienes los permisos para añadir dinero")

  const persona = message.mentions.users.first() || message.author;

  if(!dinero.tiene(`${message.guild.id}_${persona.id}`)){
    dinero.establecer(`${message.guild.id}_${persona.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${persona.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${persona.id}`, 0)
  }

  const cantidad = args[0]

  if(!cantidad) return message.channel.send("Pon una cantidad de $!")

  if(isNaN(cantidad)){
    return message.channel.send("Escribe un número")
  }

  if(cantidad >= 1000000000){
    return message.channel.send("Este es el maximo")
  }

  if(!persona) return message.channel.send("Menciona a alguien!")

  dinero.restar(`${message.guild.id}_${persona.id}`, cantidad)

  message.reply(`${user} ha quitado **${cantidad}$** a **${persona}**.`)

 }

} 