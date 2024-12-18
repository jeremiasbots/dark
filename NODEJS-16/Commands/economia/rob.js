const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "rob", 
  alias: ["robar"], 

async execute (client, message, args){

    const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user = message.author
  const persona = message.mentions.users.first();

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }
  
  if(!dinero.tiene(`${message.guild.id}_${persona.id}`)){
    dinero.establecer(`${message.guild.id}_${persona.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${persona.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${persona.id}`, 0)
  }

  if(!dinero.tiene(`${message.guild.id}_${user.id}`)){
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${persona.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!persona) return message.channel.send("Debes mencionar a alguien")

  let dineropersona = await dinero.obtener(`${message.guild.id}_${persona.id}`)
  let dinerouser = await dinero.obtener(`${message.guild.id}_${user.id}`)

  let dineroaleatorio = Math.floor(Math.random() * dineropersona) + 1

  if(persona.id === message.author.id) return message.channel.send("No te puedes robar a ti mismo")
  if(!isNaN(args[0])) return message.channel.send("Eso no es un usuario valido")

  if(dineropersona < 300) return message.channel.send("Esa persona tiene muy poco dinero no seas malo")
  if(!dinero.tiene(`${message.guild.id}_${persona.id}`)) return message.channel.send("Esta persona no tiene dinero F")

  let resultadomalo = ['mal']
  let resultadobueno = ['bien']
  let resultado = [resultadomalo, resultadobueno]
  let resultadofinal = resultado[Math.floor(Math.random() * resultado.length)]

  //let posibilidades = ['bien', 'mal']
  //let posibilidadfinal = posibilidades[Math.floor(Math.random() * posibilidades.length)]

  if(resultadofinal === resultadomalo){
    dinero.restar(`${message.guild.id}_${user.id}`, dineroaleatorio)

    message.reply(`Has intentado robar a  ${persona.tag} y has perdido**${dineroaleatorio}$**`)
  }
  
  if(resultadofinal === resultadobueno){
    dinero.restar(`${message.guild.id}_${persona.id}`, dineroaleatorio)

    dinero.sumar(`${message.guild.id}_${user.id}`, dineroaleatorio)

    message.reply(`Has robado a ${persona.tag} y has ganado **${dineroaleatorio}$**`)
  }

 }

} 