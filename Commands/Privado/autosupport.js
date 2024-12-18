const Discord = require('discord.js');

module.exports = {
  name: "autosupport", 
  alias: ["sup"], 
  developer: true,

async execute (client, message, args){

  const user = message.author;

  const embedprincipal = new Discord.MessageEmbed()
  .setTitle("Que es este canal?")
  .setDescription("En este canal se resuelven dudas sobre algunas cosas como Postulaciones para Soporte, Que es JereDev Team, Recompensas de boost, Errores de discord.js")
  .setColor("DARK_GOLD")


  

 const row = new Discord.MessageActionRow()
 .addComponents(
   new Discord.MessageSelectMenu()
   .setCustomId("menu_prueba")
   .setMaxValues(1)
   .addOptions([
     {
         label: "Postulaciones para Soporte",
         value: "sup",
         description: "Cuando estaran abiertas las postulaciones a soporte",
         emoji: "👮‍♂️"
     },
     {
       label: "Que es JereDev Team?",
       description: "Que sera JereDev Team?",
       value: "team",
       emoji: "💻"
     },
     {
       label: "Recompensas de boost",
       description: "Tus recompensas por mejorar el servidor",
       value: "boost",
       emoji: "💎"
     }
   ])
 )

message.channel.send({ embeds: [embedprincipal], components: [row] })



}

}