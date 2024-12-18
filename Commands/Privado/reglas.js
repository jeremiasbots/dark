const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })


module.exports = {
  name: "reglas", 
  alias: [], 
  developer: true,

async execute (client, message, args){

    const embedgeneral = new Discord.MessageEmbed()
    .setTitle("**REGLAS GENERALES**")
    .setDescription("**NO PUEDES HACER ESTO:**\n\n<:aquinoprro:939677558788751412> **Hacer spam en el servidor o al privado**\n<:aquinoprro:939677558788751412> **Expresarse a un usuario mediante lenguaje vulgar o groserias**\n<:aquinoprro:939677558788751412> **Pedir el『🔮』premium del bot gratis.**\n<:aquinoprro:939677558788751412> **Pasar contenido nsfw a traves del chat**")
    .setThumbnail(message.guild.iconURL())
    .setColor("DARK_BLUE")

    const embedvoz = new Discord.MessageEmbed()
    .setTitle("**CANALES DE VOZ**")
    .setDescription("**NO PUEDES HACER ESTO:**\n\n<:aquinoprro:939677558788751412> **Pasar algún contenido nsfw a traves de la cámara o hacer gemidos a través del microfono**\n<:aquinoprro:939677558788751412> **Transmitir contenido +18 a través de la cámara**\n<:aquinoprro:939677558788751412> **Vender y promocionar productos a través de la cámara y el microfono**\n<:aquinoprro:939677558788751412> **Transmitir cualquier contenido que sea con derechos de autor como Netflix, Disney +, Amazon Prime Video, Claro Video, etc**\n<:aquinoprro:939677558788751412> **Transmitir música que no sea de los bots esto incluye toda la música que no sea del comando youtube y play**")
    .setThumbnail(message.guild.iconURL())
    .setColor("DARK_BLUE")

    const embedterminos = new Discord.MessageEmbed()
    .setTitle("**Terminos de Servicio de Discord**")
    .setDescription("<:siprro:946565281931751504> **Nuestro servidor respeta los terminos y directivas de la comunidad de Discord si los rompes serás sancionado con un warn y timeout de 3 días y serás reportado a Discord lo que podría llevarte a un baneo permanente o temporal de parte de Discord y un baneo del servidor en caso que Discord te banee temporalmente o permanentemente**\n\n<:siprro:946565281931751504> **Directivas de Discord:**\n[Click aquí](https://discord.com/guidelines)\n\n<:siprro:946565281931751504> **Términos de servicio de Discord:**\n[Click aquí](https://discord.com/terms)")
    .setThumbnail(message.guild.iconURL())
    .setColor("DARK_BLUE")

    message.channel.send({ content: "@everyone", embeds: [embedgeneral, embedvoz, embedterminos] })

    message.delete()

    




 }

} 