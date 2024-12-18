const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 })
const db = require('megadb')
const neko = require('nekos.life')
const Premium = require("../../Modelos/UserPremium.js");


module.exports = {
  name: "fact", 
  alias: [], 
  developer: false,
  premium: true,

async execute (client, message, args){

    

    if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')){
        return;
    }

    const gatito_papi = new neko()
    const papi_chulo = require('@iamtraction/google-translate')


    const msg = await message.reply({ content: "**Se esta buscando un hecho**"})

    gatito_papi.sfw.fact().then(data => {
        papi_chulo(data.fact, {
            to: "es"
        }).then(texto => {
            msg.edit({ content: texto.text, allowedMentions: { repliedUser: false } }).catch(() => {
                message.reply({ content: texto.text, allowedMentions: { repliedUser: false } })
            })
        })
    })



 }

} 