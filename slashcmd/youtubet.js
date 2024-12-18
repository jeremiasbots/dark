const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const together = require('discord-together')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("youtubet")
  .setDescription("Ve un canal de youtube."),

  async run(client, interaction){
    const quejugadafueesa = new together.DiscordTogether(client)
    if(!interaction.member.voice.channel) return interaction.reply({ content: ":x: | **Primero debes estar en un canal de voz**", ephemeral: true })

    quejugadafueesa.createTogetherCode(interaction.member.voice.channel.id, "youtube").then(async invite => {
        interaction.reply(`Hola, aqui tienes tu invitacion ${invite.code}`)
    })//registra el slash y anda p
  }
}