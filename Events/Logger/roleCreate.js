const { Client, Role } = require('discord.js')
const mongoose = require("mongoose")
const logsSchema = require("../../Modelos/logsSchema")

module.exports = {
    name: "roleCreate",
    /**
     * @param {Client} client
     * @param {Role} role
     */
    async execute(role, client, Discord) {

      let cl = await logsSchema.findOne({ guildID: role.guild.id }) //Buscamos una colección que coincida con la ID del servidor
      if (!cl) return; //Si no encontró, retorna
      const embed = new Discord.MessageEmbed()
      .setTitle(`Rol Creado`)
      .addField("Nombre:", `${role.name}`, true)
      .addField("Role ID:", `${role.id}`, true)
      .addField("Color:", `${role.hexColor}`, true)

      client.channels.cache.get(cl.channelID).send({ embeds: [embed] })

    }
}