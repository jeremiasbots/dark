const { Client, Message } = require('discord.js')
const db = require("megadb")
const cc = new db.crearDB("confesioneschannel")
const cs = new db.crearDB("canalsugerencia")
const autor = new db.crearDB("autor")
const sugerencia = new db.crearDB("sugerencia")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {

        if(!message.guild || !message.channel || message.author.bot) return

        if(!message) return;

        if(!cc.tiene(message.guild.id)) return;

        const conobtener = await cc.obtener(message.guild.id)

        if(message.channel.id === conobtener){
            const embed = new Discord.MessageEmbed()
            .setTitle("**Nueva confesion**")
            .setTimestamp()
            
            if(message.content.startsWith("*")){
                embed.setFooter({ text: "Confesion anonima" })
                embed.setDescription(`${message.content.slice(1)}`)
            } else if(!message.content.startsWith("*")){
                embed.setFooter({ text: `Confesion por ${message.author.tag}` })
                embed.setDescription(`${message.content}`)
            }

            message.channel.send({ embeds: [embed] })

            message.delete()
        }


        

    }
}