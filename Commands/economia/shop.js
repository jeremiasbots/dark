const Discord = require('discord.js');

module.exports = {
  name: "shop", 
  alias: ["tienda"], 
  developer: true,

 async execute (client, message, args){


  const row = new Discord.MessageActionRow()
 .addComponents(
   new Discord.MessageSelectMenu()
   .setCustomId("menu_tienda")
   .setMaxValues(1)
   .addOptions([
     {
       label: "😎 Tienda de objetos",
       description: "Aqui es la tienda de varios objetos",
       value: "comn",
       emoji: "😎"
     },
     {
       label: "💰 Tienda del canjeo",
       description: "La tienda para canjear cosas",
       value: "tdc",
       emoji: "🤑"
     }
   ])
 )

 const embedtdc = new Discord.MessageEmbed()
 .setTitle("**Tienda del Canjeo**")
 .setDescription("**Nombre:**`500$`\n\n**Precio**:🍬 5 Caramelos 🦴 10 Huesos\n\n**Nombre:**`1000$`\n\n**Precio**: 🍬 10 Caramelos 🦴 20 Huesos\n\n**Nombre:**`5000$`\n\n**Precio**: 🍬 50 Caramelos 🦴 300 Huesos\n\n**Nombre:**`50000$`\n\n**Precio**: 🍬 30000 Caramelos 🦴 45000 Huesos")
 .setColor("RED")
 .setFooter("MÁS MONEDAS PROXIMAMENTE")
 .setThumbnail(message.guild.iconURL())

 const embedn = new Discord.MessageEmbed()
 .setTitle("Tienda")
 .setDescription("**Nombre:**`Aguita`\n\n**Descripcion:** Este objeto te da 15 de vida para que no te mueras\n\n**Precio**: 20$\n\n**Nombre:**`Galleta`\n\n**Descripcion:** Este objeto te da 35 de vida para que no te mueras\n\n**Precio**: 50$\n\n**Nombre:**`Computadora`\n\n**Descripcion:** Este objeto te da un dinero random que puede ser mayor o menor del precio del objeto\n\n**Precio**: 100$\n\n**Nombre:**`iPhone`\n\n**Descripcion:** Este objeto te da un dinero random que puede ser mayor o menor que el precio del objeto\n\n**Precio**: 350$\n\n**Nombre:**`Pico`\n\n**Descripcion:** Con este objeto puedes usar el comando $mine para minar cosas y ganar mucho dinero\n\n**Precio**: 1500$\n\n**Nombre:**`Caña`\n\n**Descripcion:** Con este objeto puedes usar el comando $fish para pescar cosas y ganar mucho dinero\n\n**Precio**: 3000$\n\n**Nombre:**`Perro`\n\n**Descripcion:** Compra una mascota como este perro para que pueda buscar cosas y intercambiarlas por dinero\n\n**Precio**: 7000$\n\n**Nombre:**`Pato`\n\n**Descripcion:** Compra una mascota como este pato para que pueda buscar cosas y intercambiarlas por dinero\n\n**Precio**: 7000$")
 .setColor("RED")
 .setFooter("MÁS OBJETOS PROXIMAMENTE")
 .setThumbnail(message.guild.iconURL())

 const m = await message.channel.send({ embeds: [embedn], components: [row] })

 const filteri = i => i.user.id === message.author.id;

 const collector = m.createMessageComponentCollector({ filter: filteri, time: 60000 })

 collector.on("collect", async i => {
   if(i.values[0] === "comn"){
     await i.deferUpdate()
     i.editReply({ embeds: [embedn], components: [row] })
   }
   if(i.values[0] === "tdc"){
     await i.deferUpdate()
     i.editReply({ embeds: [embedtdc], components: [row] })
   }
 })

 }

} 