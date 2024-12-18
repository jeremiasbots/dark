const { Client, Message } = require('discord.js')
const Schema = require("../../Modelos/sugerenciasModel.js")
const Schematwo = require("../../Modelos/votosModel.js")
const Discord = require("discord.js")


module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {

        if(!message.guild || !message.channel || message.author.bot) return;

        if(!message) return;

    

        const data = await Schema.findOne({ guild: message.guild.id })

        if(!data) return;

        const canal = data.canal;

        if(message.channel.id !== canal) return;

        message.delete();


        if(message.length < 140){
            return;
        }

        const embed = new Discord.MessageEmbed()
        .setTitle("Nueva sugerencia")
        .setDescription(`${message.content}`)
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
            .setCustomId("menusugerencias")
            .setPlaceholder("Elige alguno")
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions([
                {
                    label: "✅ Buena",
                    description: "Voto positivo a la sugerencia",
                    value: "buena",
                    emoji: "✅"
                },
                {
                    label: "😐 Neutral",
                    description: "Voto neutral a la sugerencia",
                    value: "neutral",
                    emoji: "😐"
                },
                {
                    label: "❌ Mala",
                    description: "Voto malo a la sugerencia",
                    value: "mala",
                    emoji: "❌"
                },
                {
                    label: "ℹ Ver votos",
                    description: "Ver quien ha votado y por que voto",
                    value: "ver",
                    emoji: "ℹ"
                }
            ])
        )

        

         client.channels.cache.get(canal).send({ embeds: [embed], components: [row] }).then(async(msg) => {
            await Schematwo.create({ mensaje: msg.id, votosPositivos: [], votosNegativos: [], votosNeutrales: [], author: message.author.id, contenido: message.content })
         })



        

    }
}