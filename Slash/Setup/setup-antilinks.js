const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const antiLinks = require("../../Modelos/setupAntiLinks.js")

module.exports = {
    name: "setup-antilinks",
    description: "Setea los antilinks",
    options: [
        {
            name: "accion",
            description: "Activa o desactiva el setup",
            type: 3,
            required: true,
            choices: [
                {
                    name: "encender",
                    value: "on"
                },
                {
                    name: "apagar",
                    value: "off"
                }
            ]
        }
    ],
    type: 1,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        const accion = interaction.options.getString("accion")

        if(!interaction.member.permissions.has("MANAGE_GUILD")){
            interaction.reply("No puedes usar este comando")
            return;
        }

        switch(accion){
            case "on": {
                let data;

                
                try {
                    data = await antiLinks.findOne({ Guild: interaction.guild.id })

                    if(!data){
                        data = await antiLinks.create({ Guild: interaction.guild.id })
                    }

                    data.isActive = true
                    await data.save();
                } catch (err) {
                    console.log(err)
                }
                
                interaction.reply("Sistema de antilinks activado exitosamente!")
            }
            break;

            case "off": {
                let data;

                try {
                    data = await antiLinks.findOne({ Guild: interaction.guild.id })

                    if(!data){
                        data = await antiLinks.create({ Guild: interaction.guild.id })
                    }
                    
                    data.isActive = false;
                    await data.save();
                } catch (err) {
                    console.log(err)
                }

               
                
                interaction.reply("Sistema de antilinks desactivado exitosamente!")
            }
            break;

            default:
                break;
        }

    }
}