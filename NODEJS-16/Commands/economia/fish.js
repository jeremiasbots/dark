const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")
const canaobjeto = new db.crearDB("canaobjeto")
const usepesca = new db.crearDB("usepesca")

let cooldown = new Set();

module.exports = {
  name: "fish", 
  alias: [], 

async execute (client, message, args){

    const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  if(cooldown.has(message.author.id)){
    message.channel.send(`${message.author}, espera 7 segundos antes de volver a usar el comando`)

    return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 7000);

  const user = message.author;
  const canas = await canaobjeto.obtener(`${message.guild.id}_${user.id}`)
  const fish = await usepesca.obtener(`${message.guild.id}_${user.id}`)

  if(!vida.tiene(`${message.guild.id}_${user.id}`)){
    vida.establecer(`${message.guild.id}_${user.id}`, 20)
  }

  if (!dinero.tiene(`${message.guild.id}_${user.id}`))
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!canaobjeto.tiene(`${message.guild.id}_${user.id}`)){
    canaobjeto.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!usepesca.tiene(`${message.guild.id}_${user.id}`)){
    usepesca.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  usepesca.sumar(`${message.guild.id}_${user.id}`, 1)

  if(canas < 1){
    return message.channel.send("Se necesita una `Caña` para poder usar este comando `Para comprarlo use $shop transfiera el dinero que vale la Caña a efectivo y despues use $buy Caña`")
  }

  if(fish >= 65){
    usepesca.establecer(`${message.guild.id}_${user.id}`, 0)
    message.channel.send("Se te ha roto tu `Caña` ahora tienes " + canas + " Cañas.")
    canaobjeto.restar(`${message.guild.id}_${user.id}`, 1)
    return;
  }

  let random = Math.floor(Math.random() * 15000) + 1

  let trabajo = ["Playa Gale", "Playa del Viaje", "Mar Muerto"]
  let randomTrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

  dinero.sumar(`${message.guild.id}_${user.id}`, random)

  
  const embed = new Discord.MessageEmbed()

  .setTitle("Pescar")
  .setDescription(`**${user}**, has pescado en **${randomTrabajo}** y has ganado **${random}$**`)
  .setColor("RED")

  message.reply({ embeds: [embed] })
 }

}