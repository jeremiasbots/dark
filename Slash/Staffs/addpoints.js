const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')
const User = require('../../Modelos/staffsSchema')
const Schema = require("../../Modelos/rolesStaffs.js")

module.exports = {
    name: "addpoints",
    description: "Añade puntos a un staff (owner)",
    type: 1,
    options: [
      {
        name: "usuario",
        description: "El usuario a quien le vas a añadir puntos (obligatorio)",
        type: 6,
        required: true
      },
      {
          name: "puntos",
          description: "Los puntos que les agregaras al staff (obligatorio)",
          type: 4,
          required: true
      }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){

        if(interaction.member.id !== interaction.guild.ownerId){
            interaction.reply("`Solo el owner del servidor: `  <@" + interaction.guild.ownerId + "> puede utilizar este comando.")
        }

        


      if(interaction.options.getUser("usuario").id  == interaction.guild.ownerId){
            interaction.reply({ content: "Al owner no se le pueden añadir puntos", ephemeral: true })
            return;
      }

      const optionuser = interaction.options.getUser("usuario") 

      const optionmember = interaction.options.getMember("usuario")

      const pointsownera = interaction.options.getInteger("puntos")

      const pointsowner = parseInt(pointsownera)

      const datapoints = await Schema.findOne({ guildId: interaction.guild.id })

        if(!optionmember.roles.cache.some(r => datapoints.roles.includes(r.id)) || !datapoints) return interaction.reply({ content: "El usuario no tiene ningun rol de staff o no se han configurado", ephemeral: true })

        const user = await User.findOne({ guildId: interaction.guild.id, userId: optionuser.id })

        if(!user){
          const data = new User({
            guildId: interaction.guild.id,
            userId: optionuser.id,
            points: pointsowner,
          })
          await data.save()
          interaction.reply(`Los puntos han sido añadidos a **${optionuser.username || optionuser.displayName}**`)
        } else {
          user.points = Math.floor(user.points + pointsowner)
          await user.save();
          return interaction.reply(`Los puntos han sido añadidos a **${optionuser.username || optionuser.displayName}**`)
        }

        

       

    }
}