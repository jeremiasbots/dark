const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const mongoose = require("mongoose")
const logsSchema = require("../../Modelos/logsSchema")

module.exports = {
    name: "channel-logs",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Establece el canal de logs para el servidor",
    type: 1,
    options: [
        {
            name: "channel",
            description: "El canal que quieres que sea el de logs (obligatorio)",
            type: 7, 
            channelTypes: ["GUILD_TEXT"],
            required: true
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        let channel = interaction.options.getChannel("channel")

        
            let establecido = new logsSchema({guildID: interaction.guild.id, channelID: channel.id})//Colocamos los nuevos datos.
            await establecido.save()//Guardamos los nuevos datos.
              interaction.reply({ content: '<a:si:945055058062639144> **|** El Canal de logs es <#'+channel.id+'>.', ephemeral: true })//Retorna el mensaje.
            
            let ewe = await logsSchema.findOne({ guildID: interaction.guild.id })//Averigua si ya hay algo guardado en el servidor.
            
            let channel2 = interaction.guild.channels.cache.get(ewe.channelID)//Busca el canal de confesiones.
            channel2.send("<a:si:945055058062639144> **|** Este es el nuevo canal de logs.")//Retorna mandando un mensaje al canal.
       




    }
}