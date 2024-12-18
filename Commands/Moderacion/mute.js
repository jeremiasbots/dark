const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const muterol = new db.crearDB('muterol')
const ms = require('ms')

module.exports = {
  name: "mute", 
  alias: [], 

async execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_ROLES")
  if(!perms) return message.channel.send("No tienes suficientes permisos!")

  let time = args[1]
  if(!time) return message.channel.send("Especifique un tiempo!")
  let timer = ms(time)

  let mencionado = message.mentions.members.first()
  if(!mencionado) return message.channel.send("Debes mencionar a alguien!")

  if(mencionado === '691379190842261515'){
    message.channel.send("No puedes mutear al owner!")
  }

  var razon = args[2]
  if(!razon){
    razon = 'No especificado'
  }

  if(!muterol.tiene(message.guild.id)) return message.channel.send("Este servidor no tiene ningun rol para mutear,  Para añadirlo, ponga ,muterol")

  let rol = await muterol.obtener(message.guild.id)

  if(mencionado.roles.cache.has(rol)) return message.channel.send("Este usuario ya esta muteado!")

  mencionado.roles.add(rol)

  const non = new Discord.MessageEmbed()
  .setTitle(`:loud_sound: Usuario no silenciado`)
  .setDescription(`El usuario **${mencionado}** ha sido des muteado`)
  .addField("Razón:", `${razon}`)
  .addField("Staff responsable:", `${message.author.tag}`)


  const mom = new Discord.MessageEmbed()
  .setTitle(`:mute: Usuario silenciado`)
  .setDescription(`El usuario ${mencionado} ha sido muteado durante **${time}**`)
  .addField("Razón:", `${razon}`)
  .addField("Staff responsable:", `${message.author.tag}`)

  message.channel.send({ embeds: [mom] })

  await setTimeout(async function() {

    await mencionado.roles.remove(rol)

    await message.channel.send({ embeds: [non] }).catch(error => {
     message.channel.send(`Hubo un error inesperado ${error}`)
    })

  }, timer)
if(message.deletable) message.delete()
 }

}