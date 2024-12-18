const Discord = require('discord.js');

module.exports = {
  name: "invite",
  alias: ["soporte"],

execute (client, message, args){

  const row = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setURL("https://discord.com/api/oauth2/authorize?client_id=899466667552309269&permissions=8&scope=bot%20applications.commands")
    .setLabel("Invitame")
    .setStyle("LINK")
    .setEmoji("✉"),
    new Discord.MessageButton()
    .setURL("https://discord.gg/te63due2Kb")
    .setLabel("Server de Soporte")
    .setStyle("LINK")
    .setEmoji("👮‍♂️"),
    new Discord.MessageButton()
    .setURL("https://visitaciudades.jeredev.repl.co")
    .setLabel("Pagina web")
    .setStyle("LINK")
    .setEmoji("💻")
  )
 const embed = new Discord.MessageEmbed()
 .setAuthor(`Mensaje pedido por ${message.author.tag}`)
 .setTitle("**DARK-BOT**")
 .setDescription("**INVITE**: [CLICK AQUI](https://discord.com/api/oauth2/authorize?client_id=899466667552309269&permissions=8&scope=bot%20applications.commands)\n**SOPORTE**: [CLICK AQUI](https://discord.gg/e3PzdXQVHJ)\n**PAGINA WEB:**[CLICK AQUI]( https://visitaciudades.jeredev.repl.co/)")
 .setTimestamp()
 .setColor("RANDOM")
 .setFooter({ text: "DARK-BOT BY JEREMIASBOTS AND JEREDEV TEAM" })
 .setThumbnail("https://media.discordapp.net/attachments/910686805467217985/911981898140643389/discord-bots-community.gif")
 .setImage("https://i.blogs.es/157e40/2dd4f2c1424c432a48c38178d6dc4934/1366_2000.png")

 message.channel.send({ embeds: [embed], components: [row] })
  
 }

}