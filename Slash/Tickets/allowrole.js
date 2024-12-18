const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const db = require("megadb")
const allowrole = new db.crearDB("roltickets")

module.exports = {
    name: "roletickets",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Habilita a un rol para que pueda ver los tickets",
    type: 1,
    options: [
        {
            name: "rol",
            description: "El rol que quieres que vea los ticekts",
            type: 8,
            required: true
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

        if(!interaction.member.permissions.has("ADMINISTRATOR")){
            interaction.reply({ content: "Te falta el permiso `ADMINISTRATOR` para poder usar este comando.", ephemeral: true })
            return;
        }

        let rol = interaction.options.getRole("rol")
      
        allowrole.establecer(interaction.guild.id, rol.id)
      
        interaction.reply({ content: `Se ha establecido como rol de tickets **${rol}**`, ephemeral: true })

        

       

    }
}