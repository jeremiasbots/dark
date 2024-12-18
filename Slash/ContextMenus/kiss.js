const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "Besar",//ESTO ES UN CONTEXT MENU? || no, context menu es "type: 2" | A ya :v
    type: 2,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ // pro eres, args en slash si XDDDDDDDDDDDDDDDD | no le se al together y da mal eso
    async aplication(interaction, client){


        let user = await interaction.guild.members.fetch(interaction.targetId)

        const images = ["https://media.tenor.com/dn_KuOESmUYAAAAC/engage-kiss-anime-kiss.gif", "https://i.pinimg.com/originals/9a/c6/85/9ac68568ae5c1c501bd04374cbdb6e19.gif", "https://i.gifer.com/Noyd.gif", "https://media.tenor.com/Ct9yIxN5nE0AAAAC/kiss-anime.gif", "https://data.whicdn.com/images/184975402/original.gif", "https://media.tenor.com/RdCpWpNs8kEAAAAC/anime-kissing.gif"]


        const embed = new Discord.MessageEmbed()
        .setTitle("Kiss")
        .setDescription(`<@${user.id}> ha besado a <@${interaction.user.id}>`)
        .setImage(images[Math.floor(Math.random() * images.length)])
        .setColor("RANDOM")
        .setFooter({ text: interaction.guild.name })

        interaction.reply({ embeds: [embed] })

    }
}