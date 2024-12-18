const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "shop", 
  alias: ["tienda"], 

 execute (client, message, args){

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

  const embed = new Discord.MessageEmbed()
  .setTitle("Tienda")
  .setDescription("**Nombre:**`Aguita`\n\n**Descripcion:** Este objeto te da 15 de vida para que no te mueras\n\n**Precio**: 20$\n\n**Nombre:**`Galleta`\n\n**Descripcion:** Este objeto te da 35 de vida para que no te mueras\n\n**Precio**: 50$\n\n**Nombre:**`Computadora`\n\n**Descripcion:** Este objeto te da un dinero random que puede ser mayor o menor del precio del objeto\n\n**Precio**: 100$\n\n**Nombre:**`iPhone`\n\n**Descripcion:** Este objeto te da un dinero random que puede ser mayor o menor que el precio del objeto\n\n**Precio**: 350$\n\n**Nombre:**`Pico`\n\n**Descripcion:** Con este objeto puedes usar el comando $mine para minar cosas y ganar mucho dinero\n\n**Precio**: 1500$\n\n**Nombre:**`Caña`\n\n**Descripcion:** Con este objeto puedes usar el comando $fish para pescar cosas y ganar mucho dinero\n\n**Precio**: 3000$\n\n**Nombre:**`Perro`\n\n**Descripcion:** Compra una mascota como este perro para que pueda buscar cosas y intercambiarlas por dinero\n\n**Precio**: 7000$\n\n**Nombre:**`Pato`\n\n**Descripcion:** Compra una mascota como este pato para que pueda buscar cosas y intercambiarlas por dinero\n\n**Precio**: 7000$")
  .setColor("RED")
  .setFooter("MÁS OBJETOS PROXIMAMENTE")
  .setThumbnail(message.guild.iconURL())

  message.reply({ embeds: [embed] })

 }

} 