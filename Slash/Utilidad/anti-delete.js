const Discord = require('discord.js');
const deleteSchema = require('../../Modelos/auto-delete')
const ms = require("ms")

module.exports = {
  name: "setup-autodelete",
  description: "Haz que en un canal los mensajes se puedan eliminar cada 30s",
  type: 1,
  developer: true,
  premium: true,
  options: [
      {
          name: "canal",
          description: "El canal de texto",
          type: 7,
          required: true,
          channelTypes: ["GUILD_TEXT"]
      },
      {
          name: "tiempo",
          description: "El tiempo de los mensajes",
          type: 3,
          required: true,
          choices: [
              {
                name: "30 segundos",
                value: "30s"
              },
              {
                  name: "60 segundos",
                  value: "60s"
              },
              {
                  name: "120 segundos",
                  value: "30s"
              }
          ]
      }
  ],
  perms: "MANAGE_CHANNELS",
  /**
   * 
   * @param {Discord.Interaction} interaction 
   * @param {Discord.Client} client 
   */
   async aplication(interaction, client){


        const canal = interaction.options.getChannel("canal")
        const tiempo = interaction.options.getString("tiempo") 

        const tiemp = ms(tiempo)

      
        
        deleteSchema.findOne({ GuildId: interaction.guild.id }, async (err, data) => {
            if(data) {
            data.ChannelId = canal.id
            data.Tiempo = tiemp
            data.save();
            } else {
            new deleteSchema({
                GuildId: message.guild.id,
                ChannelId: canal.id,
                Tiempo: tiemp
            }).save();
            }
        }),
        interaction.reply("✅ | **Se ha configurado todo exitosamente!!**")

      
     }
  }