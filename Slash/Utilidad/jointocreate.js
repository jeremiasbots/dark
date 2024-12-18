const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schema = require("../../Modelos/jtcSchema.js")

module.exports = {
    name: "jointocreate",
    description: "Haz un setup para crear una sala de voz",
    options: [
        {
            name: "channel",
            description: "El canal donde se creara la sala",
            type: "CHANNEL",
            channelTypes: ["GUILD_VOICE"],
            required: true
        }
    ],
    type: 1,
    perms: "MANAGE_CHANNELS",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){


        let data;

        let canal = await interaction.options.getChannel("channel")

        try {
            data = await Schema.findOne({ Guild: interaction.guild.id, Channel: canal.id })

            if(!data){
                data = await Schema.create({ Guild: interaction.guild.id, Channel: canal.id})
            }
        } catch (err) {
            console.log(err)
        }

        interaction.reply("Join to Create activado")

        


    }
}