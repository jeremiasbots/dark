const { Client, Channel } = require('discord.js')
const mongoose = require("mongoose")
const logsSchema = require("../../Modelos/logsSchema")

module.exports = {
    name: "channelDelete",
    /**
     * @param {Client} client
     * @param {Channel} channel
     */
    async execute(channel, client, Discord) {

        let cl = await logsSchema.findOne({ guildID: channel.guild.id }) //Buscamos una colección que coincida con la ID del servidor
        if (!cl) return; //Si no encontró, retorna
        const embed1 = new Discord.MessageEmbed()
        .setTitle(`Canal Borrado`)
        .addField("Canal:", `${channel.name}`, true)
        .addField("CanalID:", `${channel.id}`, true)
        .addField("Tipo:", `${channel.type}`, true)
        .addField("Categoria:", `${channel.parent}`, true)

        client.channels.cache.get(cl.channelID).send({ embeds: [embed1] })

    }
}