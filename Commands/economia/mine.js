const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const picoobjeto = new db.crearDB("picoobjeto")
const usemine = new db.crearDB("usemine")

module.exports = {
  name: "mine", 
  alias: [], 
  developer: true,
  premium: false,
  cooldown: 6000,

async execute (client, message, args){


  const user = message.author;
  const picos = await picoobjeto.obtener(`${message.guild.id}_${user.id}`)

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  if (!dinero.tiene(`${message.guild.id}_${user.id}`))
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!picoobjeto.tiene(`${message.guild.id}_${user.id}`)){
    picoobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!usemine.tiene(`${message.guild.id}_${user.id}`)){
    usemine.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  const mine = await usemine.obtener(`${message.guild.id}_${user.id}`)

  usemine.sumar(`${message.guild.id}_${user.id}`, 1)


  if(picos < 1){
    message.reply("Se necesita un `Pico` para poder usar este comando `Para comprarlo use $shop transfiera el dinero que vale el Pico a efectivo y despues use $buy Pico`")
    return;
  }

  if(mine >= 50){
    usemine.establecer(`${message.guild.id}_${user.id}`, 0)
    message.channel.send("Se te ha roto tu `Pico` ahora tienes " + picos + "  Picos.")
    picoobjeto.restar(`${message.guild.id}_${user.id}`, 1)
    return;
  }


  let random = Math.floor(Math.random() * 10000) + 1

  let trabajo = ["Penumbra", "Caverna Mística", "Abismo", "Cueva infernal", "Nether"]
  let randomTrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  dinero.sumar(`${message.guild.id}_${user.id}`, random)

  
  const embed = new Discord.MessageEmbed()

  .setTitle("Minar")
  .setDescription(`**${user}**, has minado en **${randomTrabajo}** y has ganado **${random}$**`)
  .setColor("RED")

  message.reply({ embeds: [embed] })


 }

}