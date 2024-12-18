const Discord = require('discord.js');
const economy = require("../../Modelos/userEconomia.js")

module.exports = {
  name: "rob", 
  alias: ["robar"], 
  developer: true,

async execute (client, message, args){

  const user = message.author
  const persona = message.mentions.users.first();

  if(!persona) return message.channel.send("Debes mencionar a alguien")

  const data = await economy.findOne({ guildId: message.guild.id, userId: message.author.id })
  const dataperson = await economy.findOne({ guildId: message.guild.id, userId: persona.id })

  if(!data){
    await economy.create({
      guildId: message.guild.id,
      userId: message.author.id,
      money: 0,
      moneyBank: 0,
      items: []
    })
  }

  if(!dataperson) return message.reply("Esta persona no tiene dinero")

  let dinero = data.money
  let dineroperson = dataperson.money

  let dineroaleatorio = Math.floor(Math.random() * dineroperson) + 1

  if(persona.id === message.author.id) return message.reply("No te puedes robar a ti mismo")
  if(!isNaN(args[0])) return message.reply("Eso no es un usuario valido")

  if(dineroperson < 300) return message.reply("Esa persona tiene muy poco dinero")

  let resultadomalo = ['mal']
  let resultadobueno = ['bien']
  let resultado = [resultadomalo, resultadobueno]
  let resultadofinal = resultado[Math.floor(Math.random() * resultado.length)]

  if(resultadofinal === resultadomalo){
    data.money = Math.floor(data.money - dineroaleatorio)

    message.reply(`Has intentado robar a  ${persona.tag} y has perdido**${dineroaleatorio}$**`)
  }
  
  if(resultadofinal === resultadobueno){
    dataperson.money = Math.floor(dataperson.money - dineroaleatorio)

    data.money = Math.floor(data.money + dineroaleatorio)

    message.reply(`Has robado a ${persona.tag} y has ganado **${dineroaleatorio}$**`)
  }

 }

} 