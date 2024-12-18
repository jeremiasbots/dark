const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')


module.exports = {
  name: "ping-maid", 
  alias: [], 

execute (client, message, args){

  
  const userblack = message.author;

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const user = message.mentions.members.first() || message.member

  const background = "https://media.discordapp.net/attachments/887196125612867637/918676952951447632/Screenshot_20211202-145714_Discord.png"

  const at = new Discord.MessageAttachment(background)

  message.channel.send(`${user}`, { files: at })


 }

} 