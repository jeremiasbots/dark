const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const { Modal, TextInputComponent, showModal } = require("discord-modals")

module.exports = {
    name: "eval",
    description: "Executa un codigo (developer)",
    type: 1,
    developer: true,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        

            const modal = new Modal()
            .setCustomId("modaleval")
            .setTitle("Eval")
            .addComponents(
                new TextInputComponent()
                .setLabel("Codigo")
                .setCustomId("code")
                .setMinLength(4)
                .setMaxLength(4000)
                .setPlaceholder("Escribe aquí el codigo")
                .setStyle("LONG")
                .setRequired(true)
            )


        showModal(modal, {
            client: client,
            interaction: interaction
        })


    
        

    }
}