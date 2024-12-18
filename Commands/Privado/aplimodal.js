const Discord = require("discord.js")

module.exports = {
    name: "modalapp",
    alias: [],
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */

    async execute(client, message, args){
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("Entra a Fine Network")
            .setEmoji("😎")
            .setStyle("PRIMARY")
            .setCustomId("finenet")
        )

        message.channel.send({ content: "Entra a nuestra network puedes saber los beneficios en el mensaje fijado en <#953366912992174160>", components: [row] })
    }
}