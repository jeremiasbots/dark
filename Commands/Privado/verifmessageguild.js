const { Client, Message, MessageEmbed } = require('discord.js')
const Discord = require("discord.js")

module.exports = {
  name: "verimessage",
  alias: ["guild"],
  developer: true,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */

  async execute(client, message, args) {

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setCustomId("guild")
        .setEmoji("✅")
        .setLabel("Verificate")
        .setStyle("SECONDARY")
    )

    const embed = new Discord.MessageEmbed()
    .setTitle("**Verificate** 😉")
    .setDescription("Rellena el formulario para verificarte")
    .setColor("GREEN")
    .setImage("https://media.discordapp.net/attachments/962415486749012038/963251604159598622/si.png")

    message.channel.send({ embeds: [embed], components: [row] })

    



  }

} 