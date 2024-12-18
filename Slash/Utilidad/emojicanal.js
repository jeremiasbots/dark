const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schema = require("../../Modelos/sugerenciasModel.js")

module.exports = {
    name: "emojicanal",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Elige el canal para sugerir emojis",
    type: 1,
    options: [{
        name: "canal",
        description: "El canal de emojis",
        type: 7,
        required: true,
        channelTypes: ["GUILD_TEXT"]
    }
],
perms: "MANAGE_CHANNELS",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        
        const canal = interaction.options.getChannel("canal")

        const data = await Schema.findOne({ guildId: interaction.guild.id })

        if(!data){
            await Schema.create({ guildId: interaction.guild.id, channelId: canal.id })
        } else if(data){
            data.channelId = canal.id
            await data.save();
        }
    
      interaction.reply({ content: `El canal de sugerencias ahora es **${canal.name}**`, ephemeral: true })

    }
}