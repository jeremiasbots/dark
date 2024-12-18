const Discord = require("discord.js")

module.exports = {
    name: "modform",
    alias: [],
    developer: true,
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {string[]} args
     */

    async execute(client, message, args){
        
        

        const button = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId("modstaff")
            .setLabel("Entra al staff")
            .setStyle("SUCCESS")
            .setEmoji("🚓")
        )

        message.channel.send({ content: "@here Querías entar a nuestro staff?, pues haz click en el boton para aplicar que hay muy buenas ventajas", components: [button] })
        


    }
}