const Discord = require("discord.js")

module.exports = {
    name: "actividad",
    description: "Actividades de Discord",
    type: 1,
    options: [
        {
            name: "youtube",
            description: "Actividad de youtube",
            type: 1,
            options: [
                {
                    name: "canal",
                    description: "El canal que vas a elegir",
                    type: 7,
                    channelTypes: ["GUILD_VOICE"]
                }
            ]
        },
        {
            name: "chess",
            description: "Actividad para jugar ajedrez",
            type: 1,
            options: [
                {
                    name: "canal",
                    description: "El canal que vas a elegir",
                    type: 7,
                    channelTypes: ["GUILD_VOICE"]
                }
            ]
        },
        {
            name: "spellcast",
            description: "Actividad para jugar el juego de spellcast",
            type: 1,
            options: [
                {
                    name: "canal",
                    description: "El canal que vas a elegir",
                    type: 7,
                    channelTypes: ["GUILD_VOICE"]
                }
            ]
        }
    ],

    async aplication(interaction, client){
        if(interaction.options.getSubcommand() === "youtube"){
            const canal = interaction.options.getChannel("canal") || interaction.member.voice.channel

            if(!canal) return interaction.reply({ content: "Debes poner un canal en la opción o estar conectado a uno", ephemeral: true })

            client.discordTogether.createTogetherCode(canal.id, 'youtube').then(async invite => {
                interaction.reply(`${invite.code}`)
            })
        } else if(interaction.options.getSubcommand() === "chess"){
            const canal = interaction.options.getChannel("canal") || interaction.member.voice.channel

            if(!canal) return interaction.reply({ content: "Debes poner un canal en la opción o estar conectado a uno", ephemeral: true })

            client.discordTogether.createTogetherCode(canal.id, 'chess').then(async invite => {
                interaction.reply(`${invite.code}`)
            })
        } else if(interaction.options.getSubcommand() === "spellcast"){
            const canal = interaction.options.getChannel("canal") || interaction.member.voice.channel

            if(!canal) return interaction.reply({ content: "Debes poner un canal en la opción o estar conectado a uno", ephemeral: true })

            client.discordTogether.createTogetherCode(canal.id, 'spellcast').then(async invite => {
                interaction.reply(`${invite.code}`)
            })
        }
    }
}