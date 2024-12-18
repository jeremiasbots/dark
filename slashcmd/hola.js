const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("hola")
  .setDescription("dice hola"),

  async run(client, interaction){
    interaction.reply({ content: `Hola!` })
  }
}