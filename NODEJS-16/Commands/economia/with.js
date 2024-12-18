const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "with", 
  alias: [], 

async execute (client, message, args){ 

    const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user = message.author;

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  if(!dinero.tiene(`${user.id}_${message.guild.id}`)){
    dinero.establecer(`${user.id}_${message.guild.id}`, 0)
  }

  if(!dinerobanco.tiene(`${user.id}_${message.guild.id}`)){
    dinerobanco.establecer(`${user.id}_${message.guild.id}`, 0)
  }

  const cantidad = args[0]
  if(!cantidad) return message.channel.send("Debes escribir una cantidad")

  if(cantidad === 'all'){
    const dinerototal = await dinerobanco.obtener(`${message.guild.id}_${user.id}`)

    dinerobanco.restar(`${message.guild.id}_${user.id}`, dinerototal)
    dinero.sumar(`${message.guild.id}_${user.id}`, dinerototal)

    const embedall = new Discord.MessageEmbed()
    .setTitle("With all")
    .setDescription(`${user} has convertido a efectivo todo tu dinero`)
    .setColor("RANDOM")

    message.reply({ embeds: [embedall] })
    return;
  }

  if(isNaN(cantidad)){
    return message.channel.send("Escribe un número!")
  }
  
  const dineroli = await dinerobanco.obtener(`${message.guild.id}_${user.id}`)

  if(cantidad > dineroli) return message.channel.send("No puedes convertir a efectivo esa cantidad por que es mayor a tu dinero en el banco")
  

  dinerobanco.restar(`${message.guild.id}_${user.id}`, cantidad)
  dinero.sumar(`${message.guild.id}_${user.id}`, cantidad)

  const embed = new Discord.MessageEmbed()
  .setTitle("With")
  .setDescription(`${user} has convertido a efectivo **${cantidad}**`)
  .setColor("RANDOM")
  
  message.reply({ embeds: [embed] })

  

  

 }

} 