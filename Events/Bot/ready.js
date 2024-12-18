const { Client, DiscordAPIError } = require('discord.js')
const Discord = require("discord.js")
const Schema = require("../../Modelos/commands.js")

module.exports = {
    name: "ready",
    /**
     * @param {Client} client
    */
    async execute(client) {

      
             

                const estados = [`${client.guilds.cache.size + 0} Servers`, "$help"]

            setInterval(() => {
             client.user.setPresence({
                 activities: [{
                     name:  estados[Math.floor(Math.random() * estados.length)],
                     type: "PLAYING"
                 }],
                 status: "on"
             })
            }, 10000);
            


        console.log(`Iniciando bot con el usuario: ${client.user.username}`)
        console.log(`Bot Encendido y listo con Node${process.version} 👽`)

        try {
            const embed = new Discord.MessageEmbed()
            .setTitle("**Bot en linea**")
            .setDescription(`El bot esta en linea con ${client.guilds.cache.size} servers`)
            .setColor("RANDOM")
            client.channels.cache.get("1038927350617874442").send({ embeds: [embed] })
        } catch (e) {
            console.log("Hubo un error inesperado", e)
        }

    }
}