const Discord = require("discord.js")
const { newmeme } = require("memesjere")

module.exports = {
    name: "meme",
    alias: [],
    premium: true,

    async execute(client, message, args){
        const attachment = new Discord.MessageAttachment(newmeme, "meme.jpg")

        message.reply({ files: [attachment] })
    }
}