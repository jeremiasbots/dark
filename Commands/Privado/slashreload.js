const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: "reloadslash",
    alias: [],
    developer: true,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */

    async execute(client, message, args) {
        

        const slash = client.slashcommands.map(x => x)

        console.log(slash)

        client.application.commands.set(slash).then(() => {
            message.reply({ content: "Cargados", allowedMentions: { repliedUser: false } })//DIGO TRUE XDDD
        }).catch(console.error()) 

    }

} 