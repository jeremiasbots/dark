const { Client, Message } = require("discord.js")
const Schema = require("../../Modelos/votosModel.js")

module.exports = {
    name: "messageDelete",
    /**
     * @param {Client} client
     * @param {Message} message
    */  

    async execute(message, client, Discord){
        const data = await Schema.findOne({ mensaje: message.id })

        if(!data) return;

        await Schema.findOneAndDelete({ mensaje: message.id }).catch((error) => console.error(error))
    }
}