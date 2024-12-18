const Discord = require ('discord.js');
const db = require("megadb")
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "dep", 
  alias:[], 

async execute (client, message, args) {

    const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user = message.author;

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  if(!dinero.tiene(`${message.guild.id}_${user.id}`)){
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  const cantidad = args[0]
  if(!cantidad) return message.channel.send("Debes escribir una cantidad")

  if(cantidad === 'all'){
    const dinerototal = await dinero.obtener(`${message.guild.id}_${user.id}`)

    dinero.restar(`${message.guild.id}_${user.id}`, dinerototal)
    dinerobanco.sumar(`${message.guild.id}_${user.id}`, dinerototal)

    const embedall = new Discord.MessageEmbed()
    .setTitle("Depositar")
    .setDescription(`${user} has depositado **todo tu dinero** a tu cuenta de banco`)
    .setColor("RANDOM")

    message.reply({ embeds: [embedall] })
    return;
  }

  if(isNaN(cantidad)){
    return message.channel.send("Escribe un número!")
  }

  const dineroli = await dinero.obtener(`${message.guild.id}_${user.id}`)
  
  if(cantidad > dineroli) return message.channel.send("No puedes depositar esa cantidad por que es mayor a tu dinero")
  

  dinero.restar(`${message.guild.id}_${user.id}`, cantidad)
  dinerobanco.sumar(`${message.guild.id}_${user.id}`, cantidad)

  const embed = new Discord.MessageEmbed()
  .setTitle("Depositar")
  .setDescription(`${user} has depositado **${cantidad}** a tu cuenta de banco`)
  .setColor("RANDOM")
  
  message.reply({ embeds: [embed] })



 }

}