const Discord = require('discord.js');
const db = require('megadb')
const kiss = new db.crearDB('kiss')

module.exports = {
  name: "kiss", 
  alias: ["besar"], 

async execute (client, message, args){
  
  const usuario = message.mentions.users.first()
  const autor = message.author;
  if(!usuario) return message.channel.send("Te besaras a ti mismo .-.")
  if(usuario.id === message.author.id) return message.reply("Te vas a besar a ti mismo? .-.")

  if(!kiss.tiene(`${usuario}_${autor}`)){
    kiss.establecer(`${usuario}_${autor}`, 0)
  }


  kiss.sumar(`${usuario}_${autor}`, 1)

  const kissbesos = await kiss.obtener(`${usuario}_${autor}`)

  

  const embed = new Discord.MessageEmbed()
  .setTitle(`${autor.username} Beso a ${usuario.tag}`)
  .setDescription(`${autor} y ${usuario} se han besado ${kissbesos} veces`)
  .setImage("https://acegif.com/wp-content/uploads/anime-love-2.gif")
  .setColor("RANDOM")

  message.channel.send({ embeds: [embed] })

 }

} 