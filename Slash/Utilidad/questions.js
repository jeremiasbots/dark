const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Schema = require("../../Modelos/encontrarSchema.js")

module.exports = {
    name: "questionchannel",
    description: "Crea el canal de preguntas",
    type: 1,
    options: [
        {
            name: "channel",
            description: "El canal de preguntas",
            type: 7,
            required: true,
        }
    ],
    developer: true,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        if(!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply("No tienes permisos para crear un canal!")


      
       
        const data = Schema.findOne({ Guild: interaction.guild.id })
        if(!data){
        await Schema.create({ Guild: interaction.guild.id, Channel: interaction.options.getChannel("channel").id })
        } else if(data){
            await Schema.findOneAndUpdate({ Guild: interaction.guild.id, Channel: interaction.options.getChannel("channel").id })
        }
        interaction.reply("Listo! Configuración hecha")
    



       

    }
}