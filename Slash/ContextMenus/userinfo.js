const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "Info",
    type: 2,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){


        let user = await interaction.guild.members.fetch(interaction.targetId)

        const time = client.users.cache.get(user.id)

  const timestampc = time.createdTimestamp

        
          const embed = new Discord.MessageEmbed()
          .setTitle(`**Info del usuario**`, `${user.user.username}`)
          .setColor("RANDOM")
          .addField(`**Nombre**`,`${user.user.username}`)
          .addField(`**Nombre completo**`, `${user.user.tag}`)
          .addField(`**ID**`,`${user.id}`)
          .addField(`**Apodo**`, user.displayName ? `${user.displayName}`: '❌')
          .addField("**Union al server**", `<t:${parseInt(user.joinedTimestamp / 1000)}:F>`)
          .addField("**Cuando creo la cuenta**", `<t:${parseInt(timestampc / 1000)}:F>`)
          .addField("**ROLES**", user.roles.cache.map(roles => `\`${roles.name}\``).join(', '))
          .addField("**Booster:**", user.premiumSince ? '✅': '❌')
          .setThumbnail(user.user.displayAvatarURL({ format: 'png', dynamic: 'true' }))
        
        
          interaction.reply({ embeds: [embed] })

    }
}