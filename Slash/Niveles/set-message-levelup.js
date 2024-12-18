const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const upMessage = require("../../Modelos/levelupMessage")
const mongoose = require("mongoose")

module.exports = {
    name: "set-message-levelup",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Establece el mensaje que quieres que se notifique al usuario cuando suba de rango",
    type: 1,
    options: [
        {
            name: "message",
            description: "El mensaje que quieres que se notifique al usuario cuando suba de rango",
            type: 3,
            required: true
        }
    ],
    perms: "MANAGE_GUILD",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){
          const messageExist = await upMessage.findOne({ guildId: interaction.guild.id })
          const message = interaction.options.getString("message")
      
          if(!messageExist){
            if(!message){
              return interaction.reply({ content: `:x: | \`Debes escribir un mensaje\` `, ephemeral: true }); 
            } else {
              const createMessage = new upMessage({
                guildId: interaction.guild.id,
                messageUp: message
              });
              await createMessage.save();
              return interaction.reply({ content: `✅ | \`El mensaje para los niveles ha sido colocado correctamente\``, ephemeral: true });
            }
          } else {
              messageExist.messageUp = message
              await messageExist.save()
              return interaction.reply({ content: `✅ | \`El mensaje para los niveles ha sido colocado correctamente\``, ephemeral: true });
            }
          
      



    }
}