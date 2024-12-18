const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const User = require('../../Modelos/staffsSchema')
const Schema = require("../../Modelos/rolesStaffs.js")

module.exports = {
    name: "staffspoints",
    description: "Ve tus puntos como staff o los de otros",
    type: 1,
    options: [
      {
        name: "usuario",
        description: "El usuario del que quieres ver su puntos (opcional)",
        type: 6
      }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

      const optionuser = interaction.options.getUser("usuario") || interaction.user

      const okpara = interaction.options.getMember("usuario") || interaction.member

      const data = await Schema.findOne({ guildId: interaction.guild.id })

      if(!okpara.roles.cache.some(r => data.roles.includes(r.id)) || !data) return interaction.reply({ content: "El usuario no tiene ningun rol de staff o no se han configurado", ephemeral: true })

        const user = await User.findOne({ guildId: interaction.guild.id, userId: optionuser.id })

        if(!user){
          const data = new User({
            guildId: interaction.guild.id,
            userId: optionuser.id,
            points: 0,
          })
          await data.save()
          const embed = new Discord.MessageEmbed()
          .setTitle(`Puntos de ${optionuser.displayName || optionuser.username}`)
          .addFields(
            { name: "<:staffspoints:967227172832026634> | Puntos", value: "0"},
            { name: "👑 | Owner del Server", value: `<@${interaction.guild.ownerId}>`},
            { name: "<:server:921409024841379841> | Server de Discord", value: `**${interaction.guild.name}**`}
          )
          .setColor("DARK_BLUE")
          .setTimestamp()
    
          return interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        } else {
          const embed = new Discord.MessageEmbed()
          .setTitle(`Puntos de ${optionuser.displayName || optionuser.username}`)
          .addFields(
            { name: "<:staffspoints:967227172832026634> | Puntos", value: `${Math.floor(user.points)}`},
            { name: "👑 | Owner del Server", value: `<@${interaction.guild.ownerId}>`},
            { name: "<:server:921409024841379841> | Server de Discord", value: `**${interaction.guild.name}**`}
          )
          .setColor("DARK_BLUE")
          .setTimestamp()
          return interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        }

        

       

    }
}