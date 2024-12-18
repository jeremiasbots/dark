const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const { Modal, TextInputComponent, showModal } = require("discord-modals")

module.exports = {
    name: "reportbug",
    description: "Reporta un bug del bot",
    type: 1,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

         const modal = new Modal()
         .setTitle("Reporta un bug")
         .setCustomId("reports")
         .addComponents(
           new TextInputComponent()
           .setCustomId("bug")
           .setMinLength(30)
           .setMaxLength(80)
           .setPlaceholder("Escribe aquí el bug")
           .setStyle("SHORT")
           .setLabel("Bug")
           .setRequired(true)
         )

         showModal(modal, {
           client: client,
           interaction: interaction
         })

        

    }
}