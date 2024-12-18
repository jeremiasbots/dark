const { Client, Message } = require('discord.js')
const mongoose = require("mongoose")
const logsSchema = require("../../Modelos/logsSchema")

module.exports = {
    name: "messageDelete",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {

        let cl = await logsSchema.findOne({ guildID: message.guild.id }) //Buscamos una colección que coincida con la ID del servidor
        if (!cl) return; //Si no encontró, retorna
        const embed = new Discord.MessageEmbed()
        .setTitle(`Mensaje Borrado`)
        .addField("Canal:", `${message.channel}`, true)
        .addField("Autor:", `${message.author}`, true)
        .addField("Mensaje:", (message.content && message.content !== '') ? message.content: "❌ El mensaje no se puede obtener!")

        client.channels.cache.get(cl.channelID).send({ embeds: [embed] }) //En caso de que encuentre, obtenemos el canal y enviamos el mensaje

    }
}