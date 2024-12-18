const { Client, Message } = require('discord.js')
const channelSchema = require("../../Modelos/channelLevel")
const upMessage = require("../../Modelos/levelupMessage")

module.exports = {
    name: "messageCreate",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {

        if (message.author.bot) return;

        const canallevel = await channelSchema.findOne({ guildId: message.guild.id })

        if (!canallevel) {
            return;
        }

        const levels = require("../../Modelos/levelsSchema")
        const data = await levels.findOne({ guildId: message.guild.id, userId: message.author.id })
        let randomXp;
        if (message.content.length <= 5) {
            randomXp = Math.floor(Math.random() * 3) + 1
        } else if (message.content.length >= 5 && message.content.length <= 30) {
            randomXp = Math.floor(Math.random() * 20) + 1
        } else if (message.content.length >= 30 && message.content.length <= 50) {
            randomXp = Math.floor(Math.random() * 45) + 1
        } else if (message.content.length >= 50 && message.content.length <= 70) {
            randomXp = Math.floor(Math.random() * 60) + 1
        } else if (message.content.length >= 70 && message.content.length <= 80) {
            randomXp = Math.floor(Math.random() * 70) + 1
        } else if (message.content.length > 80) {
            randomXp = Math.floor(Math.random() * 8) + 1
        }

        if (!data) {
            const newdata = new levels({
                guildId: message.guild.id,
                userId: message.author.id,
                xp: randomXp
            })

            return await newdata.save()
        }

        const xpTotal = data.xp + randomXp

        const obMessage = await upMessage.findOne({ guildId: message.guild.id })

        let messno = obMessage.messageUp

        if(!messno){
            messno = `¡Felicidades, <@${message.author.id}> Has llegado al nivel **${data.level + 1}**.`
        }


        const messdefinit = messno.replace("{user}", "<@" + message.author.id + ">").replace("{rank}", data.level + 1)


        if (xpTotal >= data.limit) {
            client.channels.cache.get(canallevel.channelId).send(messdefinit)
            return await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal, level: data.level + 1, limit: data.limit + 500 })
        }

        return await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal })

    }
}