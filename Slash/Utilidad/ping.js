const { Interaction, Client } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Muestra mi latencia!",
    type: 1,
    /**
     * @param {Interaction} interaction
     * @param {Client} client
     */ 
    async aplication(interaction, client){


        const idioms = client.la[interaction.locale]["ping"]["var1"]

        let texto = idioms.replace("{ping}", client.ws.ping)


       interaction.reply(`${texto}`)

    }
}