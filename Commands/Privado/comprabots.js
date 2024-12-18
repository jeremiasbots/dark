const Discord = require('discord.js');

module.exports = {
  name: "comprabots", 
  alias: ["bots"], 
  developer: true,

async execute (client, message, args){

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId("comprabot")
        .setEmoji("🛒")
        .setLabel("Compra un bot")
        .setStyle("SECONDARY")
    )


    message.channel.send({ content: "Compra un bot: Dark-Bot, Super Bot o Custom Bot", components: [row] })

  


}

}