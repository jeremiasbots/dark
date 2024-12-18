const Discord = require("discord.js")
const Schema = require("../../Modelos/guildVotes.js")

module.exports = {
    name: "configvotes",
    description: "Configura los votos para aceptar/rechazar una sugerencia",
    type: 1,
    options: [
        {
            name: "votosaceptar",
            description: "Los votos para aceptar una sugerencia",
            type: 10
        },
        {
            name: "votosrechazar",
            description: "Los votos para rechazar una sugerencia",
            type: 10
        }
    ],
    prem: true,
    developer: true,

    async aplication(interaction, client){

        if(!interaction.options.getNumber("votosaceptar") && !interaction.options.getNumber("votosrechazar")){
            interaction.reply({ content: "Debes poner al menos una opción de las dos", ephemeral: true })
            return;
        }

        if(interaction.options.getNumber("votosaceptar")){
            const data = await Schema.findOne({ Guild: interaction.guild.id })
            if(!data){
                await Schema.create({ Guild: interaction.guild.id, votosAceptar: interaction.options.getNumber("votosaceptar") })
            } else if(data) {
                data.votosAceptar = interaction.options.getNumber("votosaceptar")
                await data.save()
            }
        }

        if(interaction.options.getNumber("votosrechazar")){
            const datarech = await Schema.findOne({ Guild: interaction.guild.id })
            if(!datarech){
                await Schema.create({ Guild: interaction.guild.id, votosRechazar: interaction.options.getNumber("votosrechazar") })
            } else if(datarech){
                datarech.votosRechazar = interaction.options.getNumber("votosrechazar")
                await datarech.save()
            }
        }

        interaction.reply("Configuración completada")
        
    }
}