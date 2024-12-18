const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const Premium = require('../../Modelos/UserPremium')


module.exports = {
    name: "decir",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    description: "Haz que diga lo que tu quieras",
    type: 1,
    name_localizations: {
      "en-US": "say"
    },
    description_localizations: {
      "en-US": "You have to say what you want"
    },
    options: [
        {
            name: "texto",
            description: "El texto que quieres que diga",
            type: 3,
            required: true,
            name_localizations: {
              "en-US": "text"
            },
            description_localizations: {
              "en-US": "The text you want me to say"
            }
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){

    
      const ifpremium = await Premium.findOne({ userId: interaction.user.id })

      const idiomas = client.la[interaction.locale]["say"]["var2"]

       const texto = interaction.options.getString("texto")

       const channel = interaction.channel

       const textd = `**Enviado por ${interaction.user.username}**\n\n${texto}`

       if(ifpremium || interaction.member.permissions.has("MANAGE_MESSAGES")){
        interaction.reply({ content: idiomas, ephemeral: true })

        channel.send({
         content: texto,
         allowedMentions: {
           parse: ["users"]
         }
       });
       return;
       }
       
       interaction.reply({ content: idiomas, ephemeral: true })

       channel.send({
        content: textd,
        allowedMentions: {
          parse: ["users"]
        }
      });

    }
}