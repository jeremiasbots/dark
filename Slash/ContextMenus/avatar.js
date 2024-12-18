const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "Avatar",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    type: 2,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){


        let user = await interaction.guild.members.fetch(interaction.targetId)

        const embed = new Discord.MessageEmbed()
        .setTitle(`**Avatar de ${user.user.tag}**`)
        .setImage(user.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setColor("RANDOM")
        .setFooter({ text: `Avatar pedido por ${interaction.user.tag}`})
        .setTimestamp()

        interaction.reply({ embeds: [embed] })

    }
}