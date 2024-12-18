const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const db = require("megadb")
const channeltransciptions = new db.crearDB("ct")

module.exports = {
    name: "transcriptionchannel",
    description: "Elige el canal para guardar las transcripciones html",
    options: [
        {
            name: "canal",
            description: "El canal donde se guardaran las transcripciones html",
            type: 7,
            required: true,
            channelTypes: ["GUILD_TEXT"]
        }
    ],
    perms: "ADMINISTRATOR",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        let canal = interaction.options.getChannel("canal")
      
        channeltransciptions.establecer(interaction.guild.id, canal.id)
      
        interaction.reply({ content: `Se ha establecido como canal de transcripciones **${canal}**`, ephemeral: true })

        

       

    }
}