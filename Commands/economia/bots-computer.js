const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const computer = new db.crearDB("computerobjeto")

module.exports = {
  name: "computer", 
  alias: [], 
  premium: false,
  cooldown: 6000,

async execute (client, message, args){


  const user = message.author;
  const computadoras = await computer.obtener(`${message.guild.id}_${user.id}.computadoras`)

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  if (!dinero.tiene(`${message.guild.id}_${user.id}`))
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!computer.tiene(`${message.guild.id}_${user.id}.computadoras`)){
    computer.establecer(`${message.guild.id}_${user.id}.computadoras`, 0)
  }


  if(computadoras < 1){
    return message.channel.send("Se necesita una `Computadora` para poder usar este comando `Para comprarlo use $shop transfiera el dinero que vale la Computadora a efectivo y despues use $buy Computadora`")
  }


  let random = Math.floor(Math.random() * 4000) + 1

  let trabajo = ["Programaste bots", "Creaste un Libro Digital", "Chateaste en Discord"]
  let randomTrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  dinero.sumar(`${message.guild.id}_${user.id}`, random)

  
  const embed = new Discord.MessageEmbed()

  .setTitle("**COMPUTADORA**")
  .setDescription(`**${user}**, **${randomTrabajo}** y ganaste **${random}**`)
  .setColor("RED")

  message.reply({ embeds: [embed] })


 }

}