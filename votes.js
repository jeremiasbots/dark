const express = require("express")
const app = express()
const { Webhook } = require("@top-gg/sdk")
const wh = new Webhook(process.env.TOPGG_TOKEN)
const { WebhookClient, MessageEmbed } = require("discord.js")

const id = process.env.WEBHOOK_ID
const token = process.env.WEBHOOK_TOKEN

let URL = `https://discord.com/api/webhooks/${id}/${token}`

app.post('/dblwebhook', wh.listener(vote => {
    const webhook = new WebhookClient({
        id: id,
        token: token
    })
    const embed = new MessageEmbed()
    .setTitle("Nuevo voto")
    .setDescription(`<@${vote.user}> ha votado por mi`)
    .setColor("RANDOM")
    .setTimestamp()
    .setURL("https://top.gg/bot/899466667552309269/vote")
    webhook.send({ embeds: [embed] })
}))

app.listen(5000)