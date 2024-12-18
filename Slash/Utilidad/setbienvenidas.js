const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const WelcomeChannel = require("../../Modelos/WelcomeChannel");

module.exports = {
    name: "canalbienvenidas",
    description: "Establece el canal de bienvenidas",
    type: 1,
    options: [
        {
            name: "canal",
            description: "El canal que sera el de bienvenida",
            type: "CHANNEL",
            required: true
        }
    ],
    perms: "MANAGE_GUILD",
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){


          const channelExist = await WelcomeChannel.findOne({ guildId: interaction.guild.id })
          const channel = interaction.options.getChannel("canal")
      
          if(!channelExist){
            if(!channel){
              return interaction.reply({ content: `:x: | \`Debes mencionar un canal\` `, ephemeral: true }); 
            } else if(!channel.isText()){
              return interaction.reply({ content: `:x: | \`El canal debe ser un canal de texto\` `, ephemeral: true });
            } else {
              const createChannel = new WelcomeChannel({
                guildId: interaction.guild.id,
                channelId: channel.id
              });
              await createChannel.save();
              return interaction.reply({ content: `✅ | \`El canal de bienvenidas fue colocado correctamente a ${channel.name}\`` });
            }
          } else {
            if(!channel){
              return interaction.reply({ content: `:x: | \`Debes mencionar un canal\` `, ephemeral: true }); 
            } else if(!channel.isText()){
              return interaction.reply({ content: `:x: | \`El canal debe ser un canal de texto\` `, ephemeral: true });
            } else {
              channelExist.channelId = channel.id
              await channelExist.save()
              return interaction.reply({ content: `✅ | \`El canal de bienvenidas fue colocado correctamente a ${channel.name}\`` });
            }
          }
      



       

    }
}