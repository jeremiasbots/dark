const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const mascotas = new db.crearDB("mascotas")

module.exports = {
  name: "tiendadedinero", 
  alias: ["tiendadelcanje"], 

 execute (client, message, args){

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

  if(!mascotas.tiene(`${user.id}_${message.guild.id}.perros`)){
   mascotas.establecer(`${user.id}_${message.guild.id}.perros`, 0)
  }

  if(!mascotas.tiene(`${user.id}_${message.guild.id}.huesos`)){
   mascotas.establecer(`${user.id}_${message.guild.id}.huesos`, 0)
  }

  if(!mascotas.tiene(`${user.id}_${message.guild.id}.caramelos`)){
   mascotas.establecer(`${user.id}_${message.guild.id}.caramelos`, 0)
  }


  const embed = new Discord.MessageEmbed()
  .setTitle("**Tienda del Canjeo**")
  .setDescription("**Nombre:**`500$`\n\n**Precio**:🍬 5 Caramelos 🦴 10 Huesos\n\n**Nombre:**`1000$`\n\n**Precio**: 🍬 10 Caramelos 🦴 20 Huesos\n\n**Nombre:**`5000$`\n\n**Precio**: 🍬 50 Caramelos 🦴 300 Huesos\n\n**Nombre:**`50000$`\n\n**Precio**: 🍬 30000 Caramelos 🦴 45000 Huesos")
  .setColor("RED")
  .setFooter("MÁS MONEDAS PROXIMAMENTE")
  .setThumbnail(message.guild.iconURL())

  message.reply({ embeds: [embed] })

 }

} 