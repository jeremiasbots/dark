const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')


module.exports = {
  name: "start", 
  alias: [], 

async execute (client, message, args){

  
  const userblack = message.author;

  if(blacklist.has(`${userblack.id}`)){
    return message.channel.send("Usted **HA SIDO BANEADO DE VISITA CIUDADES**")
  }

  const embed = new Discord.MessageEmbed()

  .setTitle("El juego ha empezado!")
  .setDescription("Todos los usuarios deben estar en un canal de voz conjunto para empezar :)"
  )
  .setColor("GREEN")
  .setThumbnail("https://i.imgur.com/vKF42bH.png")
  .setTimestamp()

  const role = message.guild.roles.cache.find((r) => r.name === 'amongus-moderator')
        //--------------------------------------------------------------------------------------------------------
        if (!role) return message.channel.send(`Among Us no ha sido seteado, para setearlo use el comando \n,setup\n y podra usar este.`)
        if (!message.member.roles.cache.has(role.id)) return message.channel.send(`Este comando solo puede ser usado por los miembros del rol ${role}, role.`)
        
        let channel = message.member.voice.channel;
        for (let member of channel.members.filter((member) => !member.user.bot)) {
            await member[1].voice.setDeaf(true);
        }
        message.channel.send({ embeds: [embed] })


 }

} 