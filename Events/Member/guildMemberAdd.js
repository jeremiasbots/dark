const { Client, GuildMember } = require('discord.js')
const Discord = require('discord.js')
const WelcomeChannel = require('../../Modelos/WelcomeChannel')

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {GuildMember} member
    */
    async execute(member, client) {


        const miembro = await WelcomeChannel.findOne({ guildId: member.guild.id })
        if (!miembro) {
            return;
        } else if (!miembro.channelId) {
            return;
        } else {
           const embed = new Discord.MessageEmbed()
           .setTitle("Bienvenido")
           .setThumbnail(member.user.displayAvatarURL({ size: 1024, dynamic: true }))
           .setDescription(`Bienvenido <@${member.id}> a **${member.guild.name}**`)
           .setFooter({ text: "Espero que te la pases bien!" })
           .setColor("RANDOM")

            client.channels.cache.get(miembro.channelId).send({ embeds: [embed] })
        }

        

    }
}