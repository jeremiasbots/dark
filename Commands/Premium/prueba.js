const Discord = require('discord.js');
const Premium = require("../../Modelos/UserPremium.js");

module.exports = {
  name: "rangodark", 
  alias: [],
  developer: false,
  premium: false,

async execute (client, message, args){

  const UserIsPremium = await Premium.findOne({ userId: message.author.id });
  if(!UserIsPremium) {
    const embed = new Discord.MessageEmbed()
    .setTitle("**RANGO**")
    .setDescription("Tu rango actual es `Seguidor de Dark-Bot`\n\n:pro: **Actualiza a Miembro ya, solo paga 3$ tendras disponible esto si te unes:**\n-**Afk**\n-**Backups**\n-**Sorteos**\n-**Funciones beta**\n-**Insignia personalizada en algunos comandos**")
    .setColor("RANDOM")
    .setFooter({ text: "Se aclara que este contenido no obliga a los usuarios a comprar el rango Miembro solo muestra las ventajas de comprarlo" })
    message.reply({ embeds: [embed] })
    return;
  }

  const embedpremium = new Discord.MessageEmbed()
  .setTitle("**RANGO**")
  .setDescription("**Tu rango es `Miembro de Dark-Bot` Muy bien gracias por ser Miembro pronto se dara ventajas en economia a los miembros**")
  .setColor("RANDOM")
  .setFooter({ text: "Gracias por ser Miembro" })

  message.reply({ embeds: [embedpremium] })


 }

} 