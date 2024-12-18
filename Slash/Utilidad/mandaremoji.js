const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schema = require("../../Modelos/sugerenciasModel.js")

module.exports = {
    name: "mandaremoji",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Manda un emoji",
    type: 1,
    options: [
    {
        name: "archivo",
        description: "El archivo para mandar al canal de emojis",
        type: 11,
        required: true
    }
],
developer: true,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        
        const option = interaction.options.getAttachment("archivo")

        const array = ["image/jpeg", "image/png"]

        if(!array.includes(option.contentType)) return interaction.reply({ content: "Solo se aceptan imagenes PNG/JPG", ephemeral: true })


        const data = await Schema.findOne({ guildId: interaction.guild.id })

        if(!data) return interaction.reply({ content: "Este servidor no tiene ningun canal para sugerir emojis", ephemeral: true })
    
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("aceptaremoji")
            .setLabel("Bueno")
            .setEmoji("✔️")
            .setStyle("SECONDARY"),
            new Discord.MessageButton()
            .setCustomId("rechazaremoji")
            .setLabel("Malo")
            .setEmoji("❌")
            .setStyle("SECONDARY")
        )

        const embed = new Discord.MessageEmbed()
        .setTitle("Nuevo emoji")
        .setImage(option.proxyURL)
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() || "https://img.freepik.com/vector-premium/pagina-inicio-error-404-archivo-diseno-plano_249405-162.jpg?w=2000" })
        .setColor("RANDOM")

        client.channels.cache.get(data.channelId).send({ embeds: [embed], components: [row] })

        interaction.reply({ content: "Emoji enviado", ephemeral: true })

    }
}