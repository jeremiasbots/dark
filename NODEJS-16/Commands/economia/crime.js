const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")


let cooldown = new Set()

module.exports = {
  name: "crime", 
  alias: ["crimen"], 

execute (client, message, args){

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
  

  const crimenes = ['ha robado un banco', 'ha robado en la tiendita de la pobre señora']

  const crimenesmalos = ['ha robado un banco', 'ha robado en la tiendita de la pobre señora']

  let resultadosbuenos = crimenes[Math.floor(Math.random() * crimenes.length)]

  let resultadosmalos = crimenesmalos[Math.floor(Math.random() * crimenesmalos.length)]

  let resultados = [resultadosbuenos, resultadosmalos]

  let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

  let dinerobueno = Math.floor(Math.random() * 175) + 100

  let dineromalo = Math.floor(Math.random() * -175) + -100

  

  if(resultadofinal === resultadosbuenos){

    dinero.sumar(`${message.guild.id}_${user.id}`, dinerobueno)

    const embed1 = new Discord.MessageEmbed()
    .setTitle("Crime")
    .setDescription(`**${user}**, has robado en **${resultadosbuenos}** y has ganado **${dinerobueno}$**.`)
    .setColor("RANDOM")

    message.reply({ embeds: [embed1] })

    return;

    
  }


  if(resultadofinal === resultadosmalos){

    dinero.sumar(`${message.guild.id}_${user.id}`, dineromalo)

    const embed2 = new Discord.MessageEmbed()

    .setTitle("Crime")
    .setDescription(`${user} ${resultadosmalos} y ha perdido ${dineromalo}`)
    .setColor("RANDOM")

    message.reply({ embeds: [embed2] })

    return;
  }


  


 }

} 