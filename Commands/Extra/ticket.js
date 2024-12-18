const Discord = require('discord.js');
const db = require('megadb')
const allowrole = new db.crearDB("roltickets")


module.exports = {
  name: "tickets", 
  alias: [], 

async execute (client, message, args){

  if(!message.member.permissions.has("ADMINISTRATOR")){
    message.reply("Necesitas los permisos de administrador para utilizar este comando.")
    return;
  }


  if(!allowrole.tiene(message.guild.id)){
    message.reply("Debes establecer el rol especial para ver los tickets con /roletickets")
    return;
  }

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Tickets")
  .setDescription("Presiona el boton de abajo para crear un ticket.")
  .setColor("GREEN")
  

  const row = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setCustomId("tickets")
    .setStyle("SUCCESS")
    .setLabel("Crear Ticket")
    .setEmoji("🎫")
  )

  message.channel.send({ embeds: [embed], components: [row] })
  
 }

} 