const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB("dinero")
const dinerobanco = new db.crearDB("dinerobanco")
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")


let cooldown = new Set()

module.exports = {
  name: "slut", 
  alias: [], 

async execute (client, message, args){

    const userblack = message.author;

  if(blacklist.has(userblack.id)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  if(cooldown.has(message.author.id)){
    message.channel.send("Debes esperar 10s antes de utilizar el comando de nuevo")
    return;
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  
  }, 10000);

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

  let random = Math.floor(Math.random() * 575) + 100
  

  const poll = ['has hecho poll dance', 'has ido a un bar']

  const pollmalo = ['has hecho poll dance y te descubrio tu hija', 'has ido a un bar y te descubrio tu esposo']

  let resultadosbuenos = poll[Math.floor(Math.random() * poll.length)]

  let resultadosmalos = pollmalo[Math.floor(Math.random() * pollmalo.length)]

  let resultados = [resultadosbuenos, resultadosmalos]

  let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

  let dinerobueno = Math.floor(Math.random() * 175) + 100

  let dineromalo = Math.floor(Math.random() * -175) + -100

  

  

  if(resultadofinal === resultadosbuenos){

  dinero.sumar(`${message.guild.id}_${user.id}`, dinerobueno)

  const embed = new Discord.MessageEmbed()
  .setTitle("Slut")
  .setDescription(`**${user.tag}** **${resultadosbuenos}** y has conseguido **${dinerobueno}**`)
  .setColor("GREEN")

  message.reply({ embeds: [embed] })

  }

  if(resultadofinal === resultadosmalos){

  dinero.sumar(`${message.guild.id}_${user.id}`, dineromalo)

  const embed = new Discord.MessageEmbed()
  .setTitle("Slut")
  .setDescription(`**${user.tag}** **${resultadosmalos}** y has perdido **${dineromalo}**`)
  .setColor("RED")

  message.reply({ embeds: [embed] })

  }
  
 }



}
  