const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const vida = new db.crearDB('vida')
const blacklist = new db.crearDB("blacklist")

let cooldown = new Set()


module.exports = {
  name: "pay", 
  alias: ["pagar"], 

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

  const user = message.mentions.users.first()
  const persona = message.author;

  if(!vida.tiene(`${message.guild.id}_${persona.id}`)){
    vida.establecer(`${message.guild.id}_${persona.id}`, 20)
  }

  const cantidad = args[0]

  if(!user) return message.channel.send("Menciona a alguien!")

  if(!cantidad) return message.channel.send("Eso no es un número valido!")

  if(user.id === message.author.id) return message.channel.send("No te puedes prestar a ti mismo")

  if(!dinero.tiene(`${message.guild.id}_${persona.id}`)){
    dinero.establecer(`${message.guild.id}_${persona.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${persona.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${persona.id}`, 0)
  }

  if(!dinero.tiene(`${message.guild.id}_${user.id}`)){
    dinero.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(!dinerobanco.tiene(`${message.guild.id}_${user.id}`)){
    dinerobanco.establecer(`${message.guild.id}_${user.id}`, 0)
  }

  if(cantidad === "all"){
    const dinerototal = await dinero.obtener(`${message.guild.id}_${persona.id}`)

    dinero.restar(`${message.guild.id}_${persona.id}`, dinerototal)
    dinero.sumar(`${message.guild.id}_${user.id}`, dinerototal)

    const embedall = new Discord.MessageEmbed()
    .setTitle("Pagar")
    .setDescription(`${persona} has pagado **todo tu dinero** a ${user}`)
    .setColor("RANDOM")

    message.reply({ embeds: [embedall] })
    return;
  }

  if(isNaN(cantidad)){
    return message.channel.send("Escribe un número!")
  }

  dineropersonapay = await dinero.obtener(`${message.guild.id}_${persona.id}`)

  if(cantidad > dineropersonapay) return message.channel.send("No puedes pagar más monedas de las que tienes!")


  dinero.sumar(`${message.guild.id}_${user.id}`, cantidad)
  dinero.restar(`${message.guild.id}_${persona.id}`, cantidad)

  const embed = new Discord.MessageEmbed()
  .setTitle("Pagar")
  .setDescription(`El usuario **${persona}** ha pagado **${cantidad}** a el usuario **${user}**`)
  .setColor("RED")

  message.reply({ embeds: [embed] })


  
 }

} 