const Discord = require("discord.js")
const Schema = require("../../Modelos/antiraidSchema.js")

module.exports = {
    name: "antiraid",
    description: "Activa el sistema anti-raid en el servidor",
    type: 1,
    developer: true,
    options: [
        {
            name: "accion",
            description: "La accion que vas a hacer on/off",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Encender",
                    value: "on"
                },
                {
                    name: "Apagar",
                    value: "off"
                }
            ]
        },
        {
            name: "limite",
            description: "El limite para crear canales",
            type: 4
        }
    ],

    async aplication(interaction, client){
        if(interaction.member.id !== interaction.guild.ownerId) return interaction.reply({ content: "Solo el owner del servidor puede ejecutar este comando", ephemeral: true })

        const data = await Schema.findOne({ Guild: interaction.guild.id })

        let bopcion;

        if(interaction.options.getString("accion") === "on"){
            if(!interaction.options.getInteger("limite")) return interaction.reply("Pon un limite de canales")
            
            bopcion = true;
        } else if(interaction.options.getString("accion") === "off"){
            bopcion = false;
        }

        if(!data && interaction.options.getString("accion") === "off") return interaction.reply("Aún no has activado el sistema")


        if(!data){
            await Schema.create({
                Guild: interaction.guild.id,
                antiCrearCanales: true, 
                limite: interaction.options.getInteger("limite")
            })
        } else if(data){
            data.antiCrearCanales = bopcion
            data.limite = interaction.options.getInteger("limite") || "5"
            await data.save();
        }

        interaction.reply("Sistema anti-raid configurado")
    }
}