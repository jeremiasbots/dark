const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const db = require("megadb")
const category = new db.crearDB("categorytickets")

module.exports = {
    name: "categorytickets",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Define la categoria donde se crearan los tickets",
    type: 1,
    options: [
        {
            name: "categoria",
            description: "La categoria",
            type: 7,
            channelTypes: ["GUILD_CATEGORY"],
            required: true
        }
    ],
    perms: "ADMINISTRATOR", 
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){


        let categorytickets = interaction.options.getChannel("categoria")
      
       category.establecer(interaction.guild.id, categorytickets.id)
      
        interaction.reply({ content: client.la[interaction.locale]["category"]["var10"], ephemeral: true })

        

       

    }
}