const Discord = require("discord.js")
const Memes = require("discord-memes2")

module.exports = {
    name: "meme",
    description: "Ve un meme (premium)",
    type: 1,
    premium: true,

    async aplication(interaction){
        
       

        interaction.reply(Memes.imagenesEspañol())
    }
}